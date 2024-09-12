import MESSAGES from '../lang/messages/en/lab0.js';

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

    // Set the position of the button in the DOM
    setPosition(top, left) {
        this.position = [left, top];
        this.buttonElement.style.top = top + 'px';
        this.buttonElement.style.left = left + 'px';
    }

    // Hide the order on the button
    hideOrder() {
        this.buttonElement.innerText = ''; // Hide the order
    }

    // Show the order on the button
    showOrder() {
        this.buttonElement.innerText = this.order; // Reveal the order
    }

    // Move the button to a new position
    move(newPosition) {
        this.setPosition(newPosition[1], newPosition[0]);
    }
}


class ButtonManager {
    constructor() {
        this.buttons = []; // List of current buttons
        this.numButtons = 0;
        this.userSequence = []; // User's click sequence
        this.correctSequence = []; // Correct sequence
    }

    // Method to remove all existing buttons from the DOM and clear arrays
    removeExistingButtons() {
        this.buttons.forEach(button => {
            button.buttonElement.remove(); // Remove from the DOM
        });

        // Clear the buttons array and sequences
        this.buttons = [];
        this.userSequence = [];
        this.correctSequence = [];
    }

    // Create new buttons and remove old ones
    createButtons(n) {
        this.numButtons = n;

        // Clear any previous buttons before creating new ones
        this.removeExistingButtons();
        
        for (let i = 0; i < n; i++) {
            const color = this.generateRandomColor(); // Generate a random color for each button
            const pattern = this.generateRandomPattern(color); // Add a random pattern
            const button = new GameButton(i + 1, color, pattern); // Create a new button
            this.buttons.push(button); // Add button to the list
            this.correctSequence.push(i); // Store the correct sequence
        }
        this.displayButtonsInRow();
    }

    // Display buttons in a row (for initial layout)
    displayButtonsInRow() {
        let leftPos = 0;
        this.buttons.forEach(button => {
            button.setPosition(100, leftPos); // Set initial positions in a row
            leftPos += 120; // Adjust next button's position
        });
    }

    // Generate a random color for each button
    generateRandomColor() {
        const hue = Math.random() * 360; // Random hue between 0 and 360
        const saturation = 70 + Math.random() * 30; // Random saturation between 70% and 100%
        const lightness = 50 + Math.random() * 20; // Random lightness between 50% and 70%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
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

    // Enable the user to click on the buttons (after scrambling)
    enableUserInput() {
        this.buttons.forEach((button, index) => {
            button.buttonElement.addEventListener('click', () => {
                this.handleUserClick(index);
            });
        });
    }

    // Handle user click on a button
    handleUserClick(index) {
        if (this.correctSequence[this.userSequence.length] === index) {
            this.userSequence.push(index); // Record user's choice
            this.buttons[index].showOrder(); // Reveal the button's order
            if (this.userSequence.length === this.numButtons) {
                alert(MESSAGES.successMessage); // If all buttons are clicked correctly
            }
        } else {
            alert(MESSAGES.failureMessage); // If user clicks incorrectly
            this.revealCorrectSequence(); // Reveal the correct order
        }
    }

    // Reveal the correct order of the buttons
    revealCorrectSequence() {
        this.buttons.forEach(button => button.showOrder());
    }

    // Hide the order on all buttons (used before game interaction)
    hideOrders() {
        this.buttons.forEach(button => {
            button.hideOrder();
        });
    }
}

class ScrambleManager {
    constructor(buttonManager) {
        this.buttonManager = buttonManager;

        // Handle window resize event to keep buttons in the visible area
        window.addEventListener('resize', () => this.adjustForResize());
    }

    // Scramble buttons randomly numScrambles times
    scrambleButtons(numScrambles) {
        for (let i = 0; i < numScrambles; i++) {
            setTimeout(() => {
                this.moveButtonsRandomly();
            }, i * 2000); // Move every 2 seconds
        }

        setTimeout(() => {
            this.buttonManager.hideOrders(); // Hide the button orders
            this.buttonManager.enableUserInput(); // Enable user interaction after scrambling
        }, numScrambles * 2000);
    }

    // Move all buttons to non-overlapping positions and within the window
    moveButtonsRandomly() {
        const buttonWidth = 160; // Approx 10em in pixels
        const buttonHeight = 80;  // Approx 5em in pixels
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        let newPositions = [];

        this.buttonManager.buttons.forEach(button => {
            let newPosition;

            // Generate new positions until we find one that does not overlap or go out of bounds
            do {
                newPosition = this.randomPosition(buttonWidth, buttonHeight, windowWidth, windowHeight);
            } while (this.checkOverlap(newPosition, newPositions, buttonWidth, buttonHeight));

            // Store the new position and update the button
            newPositions.push(newPosition);
            button.move(newPosition);
        });
    }

    // Randomly generate a valid position within the window bounds
    randomPosition(buttonWidth, buttonHeight, windowWidth, windowHeight) {
        // Ensure the position is within the bounds of the visible window
        const x = Math.random() * (windowWidth - buttonWidth);
        const y = Math.random() * (windowHeight - buttonHeight);
        return [x, y];
    }

    // Check if the new position overlaps with any of the already placed buttons
    checkOverlap(newPosition, existingPositions, buttonWidth, buttonHeight) {
        const [newX, newY] = newPosition;

        // Loop through the already determined new positions to check for overlap
        for (let pos of existingPositions) {
            const [posX, posY] = pos;
            const dx = Math.abs(posX - newX);
            const dy = Math.abs(posY - newY);

            if (dx < buttonWidth && dy < buttonHeight) {
                return true; // Overlap detected
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

            // Ensure buttons stay within the new window bounds after resizing
            const adjustedX = Math.min(Math.max(0, x), windowWidth - 160); // Keep within width
            const adjustedY = Math.min(Math.max(0, y), windowHeight - 80); // Keep within height

            button.move([adjustedX, adjustedY]); // Adjust the button's position
        });
    }
}



class ButtonInputBox {
    constructor(buttonManager) {
        this.buttonManager = buttonManager;  // Reuse the same ButtonManager instance
        this.inputElement = null;  // Initialize input element to null
        this.startButton = null;  // Initialize start button to null
        this.createInputBox();  // Call method to create the input box
    }

    createInputBox() {
        // Create label
        const inputBoxLabel = document.createElement('label');
        inputBoxLabel.htmlFor = 'numButtons';
        inputBoxLabel.innerText = MESSAGES.userPromptMessage;

        // Create input field
        this.inputElement = document.createElement('input');
        this.inputElement.id = 'numButtons';
        this.inputElement.type = 'number';
        this.inputElement.min = 3;
        this.inputElement.max = 7;
        this.inputElement.placeholder = 'Enter a number between 3 and 7';

        // Create button
        this.startButton = document.createElement('button');
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
        this.inputElement.disabled = true;
        this.startButton.disabled = true;
    }

    enableInput() {
        this.inputElement.disabled = false;
        this.startButton.disabled = false;
    }

    onButtonClick() {
        const numButtons = this.getNumberOfButtons();
        if (numButtons !== null) {
            const scrambleManager = new ScrambleManager(this.buttonManager);  // Use existing ButtonManager instance

            // Disable the input and start button while the game is running
            this.disableInput();

            // Remove existing buttons and create new ones
            this.buttonManager.createButtons(numButtons);

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


// Initialize a single instance of ButtonManager
const buttonManager = new ButtonManager();

// Initialize the input box and pass the ButtonManager instance
const inputBox = new ButtonInputBox(buttonManager);
