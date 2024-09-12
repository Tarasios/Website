import MESSAGES from '../lang/messages/en/user.js';

class GameButton {
    constructor(order, color, pattern) {
        this.order = order;
        this.color = color;
        this.pattern = pattern; // Pattern will be a CSS background property
        this.buttonElement = document.createElement("button");

        this.buttonElement.innerText = order; // Show the initial order as passed
        this.buttonElement.style.background = pattern ? pattern : color;
        this.buttonElement.style.height = '5em';
        this.buttonElement.style.width = '10em';
        this.buttonElement.style.position = 'absolute'; // For random movement
        document.body.appendChild(this.buttonElement);

        // Initial position
        this.position = [0, 0];
    }

    setPosition(top, left) {
        this.position = [left, top];
        this.buttonElement.style.top = top + 'px';
        this.buttonElement.style.left = left + 'px';
    }

    hideOrder() {
        this.buttonElement.innerText = ''; // Hide the order
    }

    showOrder() {
        this.buttonElement.innerText = this.order; // Reveal the order
    }

    move(newPosition) {
        this.setPosition(newPosition[1], newPosition[0]);
    }
}



class ButtonManager {
    constructor() {
        this.buttons = [];
        this.numButtons = 0;
        this.userSequence = [];
        this.correctSequence = [];
    }

    // Use a function to generate a distinct color
    generateDistinctColor(index, total) {
        const hue = (index / total) * 360; // Ensure different hues
        return `hsl(${hue}, 100%, 50%)`; // Full saturation, medium lightness
    }

    // Add random patterns to buttons
    generateRandomPattern(color) {
        const patterns = [
            `repeating-linear-gradient(45deg, ${color}, ${color} 10px, white 10px, white 20px)`, // Stripes
            `radial-gradient(circle, ${color} 50%, white 50%)`, // Dots
            `repeating-linear-gradient(90deg, ${color}, ${color} 10px, white 10px, white 20px)`, // Horizontal stripes
            `repeating-linear-gradient(135deg, ${color}, ${color} 5px, white 5px, white 10px)` // Diagonal stripes
        ];

        // Randomly select a pattern
        const randomIndex = Math.floor(Math.random() * patterns.length);
        return patterns[randomIndex];
    }

    createButtons(n) {
        this.numButtons = n;
        this.removeExistingButtons();
        for (let i = 0; i < n; i++) {
            const color = this.generateDistinctColor(i, n);
            const pattern = this.generateRandomPattern(color);
            const button = new GameButton(i + 1, color, pattern);
            this.buttons.push(button);
            this.correctSequence.push(i);
        }
        this.displayButtonsInRow();
    }

    displayButtonsInRow() {
        let leftPos = 0;
        this.buttons.forEach(button => {
            button.setPosition(100, leftPos); // Set initial positions in a row
            leftPos += 120; // Adjust next button's position
        });
    }

    enableUserInput() {
        this.buttons.forEach((button, index) => {
            button.buttonElement.addEventListener('click', () => {
                this.handleUserClick(index);
            });
        });
    }

    handleUserClick(index) {
        if (this.correctSequence[this.userSequence.length] === index) {
            this.userSequence.push(index);
            this.buttons[index].showOrder();
            if (this.userSequence.length === this.numButtons) {
                alert(MESSAGES.successMessage);
            }
        } else {
            alert(MESSAGES.failureMessage);
            this.revealCorrectSequence();
        }
    }

    revealCorrectSequence() {
        this.buttons.forEach(button => button.showOrder());
    }

    removeExistingButtons() {
        this.buttons.forEach(button => {
            button.buttonElement.remove();
        });
        this.buttons = [];
        this.userSequence = [];
        this.correctSequence = [];
    }

    hideOrders() {
        this.buttons.forEach(button => {
            button.hideOrder();
        });
    }
}

class ScrambleManager {
    constructor(buttonManager) {
        this.buttonManager = buttonManager;

        // Handle window resize event
        window.addEventListener('resize', () => this.adjustForResize());
    }

    scrambleButtons(numScrambles) {
        for (let i = 0; i < numScrambles; i++) {
            setTimeout(() => {
                this.moveButtonsRandomly();
            }, i * 2000); // Move every 2 seconds
        }

        setTimeout(() => {
            this.buttonManager.hideOrders();
            this.buttonManager.enableUserInput(); // Allow user interaction after scrambling
        }, numScrambles * 2000);
    }

    moveButtonsRandomly() {
        const buttonWidth = 160; // Approx 10em in pixels
        const buttonHeight = 80;  // Approx 5em in pixels
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        this.buttonManager.buttons.forEach(button => {
            let newPosition;

            // Generate new positions until we find one that does not overlap
            do {
                newPosition = this.randomPosition(buttonWidth, buttonHeight, windowWidth, windowHeight);
            } while (this.checkOverlap(newPosition, button, buttonWidth, buttonHeight));

            button.move(newPosition);
            this.buttonManager.updateButtonPosition(button);
        });
    }

    // Randomly generate a valid position within the window bounds
    randomPosition(buttonWidth, buttonHeight, windowWidth, windowHeight) {
        const x = Math.random() * (windowWidth - buttonWidth);
        const y = Math.random() * (windowHeight - buttonHeight);
        return [x, y];
    }

    // Check if the new position overlaps with any other button
    checkOverlap(newPosition, currentButton, buttonWidth, buttonHeight) {
        const [newX, newY] = newPosition;

        // Loop through all buttons to check for overlap
        for (let button of this.buttonManager.buttons) {
            if (button !== currentButton) {
                const [buttonX, buttonY] = button.position;
                const dx = Math.abs(buttonX - newX);
                const dy = Math.abs(buttonY - newY);
                
                if (dx < buttonWidth && dy < buttonHeight) {
                    return true; // Overlap detected
                }
            }
        }
        return false; // No overlap
    }

    // Adjust button positions after window resize
    adjustForResize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        this.buttonManager.buttons.forEach(button => {
            const [x, y] = button.position;

            // If the button is outside the current window size, move it inside
            const adjustedX = Math.min(x, windowWidth - 160); // Button width approx 160px
            const adjustedY = Math.min(y, windowHeight - 80);  // Button height approx 80px

            button.move([adjustedX, adjustedY]);
            this.buttonManager.updateButtonPosition(button);
        });
    }
}


class ButtonInputBox {
    constructor() {
        this.inputElement = null;  // Initialize with null to avoid any undefined issues
        this.startButton = null;  // Initialize with null
        this.createInputBox();  // Call the method to create the input and button
    }

    createInputBox() {
        // Create label
        const inputBoxLabel = document.createElement('label');
        inputBoxLabel.htmlFor = 'numButtons';
        inputBoxLabel.innerText = MESSAGES.userPromptMessage;

        // Create input field
        this.inputElement = document.createElement('input');  // Set to the instance variable
        this.inputElement.id = 'numButtons';
        this.inputElement.type = 'number';
        this.inputElement.min = 3;
        this.inputElement.max = 7;
        this.inputElement.placeholder = 'Enter a number between 3 and 7';

        // Create button
        this.startButton = document.createElement('button');  // Set to the instance variable
        this.startButton.id = 'startBtn';
        this.startButton.innerText = MESSAGES.goButtonText;

        // Append input elements to the document body
        document.body.appendChild(inputBoxLabel);
        document.body.appendChild(this.inputElement);
        document.body.appendChild(this.startButton);

        // Add event listener to the button
        this.startButton.addEventListener('click', () => this.onButtonClick());
    }

    getNumberOfButtons() {
        const value = parseInt(this.inputElement.value, 10);
        if (isNaN(value) || value < 3 || value > 7) {
            alert(MESSAGES.invalidInputMessage);
            return null;
        }
        return value;
    }

    disableInput() {
        if (this.inputElement && this.startButton) {
            this.inputElement.disabled = true;
            this.startButton.disabled = true;
        } else {
            console.error("Input or Start Button not found.");
        }
    }

    enableInput() {
        if (this.inputElement && this.startButton) {
            this.inputElement.disabled = false;
            this.startButton.disabled = false;
        } else {
            console.error("Input or Start Button not found.");
        }
    }

    onButtonClick() {
        const numButtons = this.getNumberOfButtons();
        if (numButtons !== null) {
            const buttonManager = new ButtonManager();
            const scrambleManager = new ScrambleManager(buttonManager);

            // Disable the input and start button while the game is running
            this.disableInput();

            buttonManager.createButtons(numButtons);

            // Start scrambling after a pause of numButtons seconds
            setTimeout(() => {
                scrambleManager.scrambleButtons(numButtons);
            }, numButtons * 1000); // Wait n seconds before scrambling

            // Re-enable the input and button after the game ends
            setTimeout(() => {
                this.enableInput();
            }, (numButtons * 2000) + 5000); // Estimate game time (scrambling + play time)
        }
    }
}



// Initialize the input box and start the game
const inputBox = new ButtonInputBox();
