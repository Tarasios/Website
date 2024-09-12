import MESSAGES from '../lang/messages/en/user.js';

class GameButton {
    constructor(color, order) {
        this.order = order;
        this.color = color;
        this.buttonElement = document.createElement("button");
        this.buttonElement.innerText = order + 1; // Show the initial order
        this.buttonElement.style.backgroundColor = color;
        this.buttonElement.style.height = '5em';
        this.buttonElement.style.width = '10em';
        this.buttonElement.style.position = 'absolute'; // For random movement
        document.body.appendChild(this.buttonElement);
    }

    setPosition(top, left) {
        this.buttonElement.style.top = top + 'px';
        this.buttonElement.style.left = left + 'px';
    }

    hideOrder() {
        this.buttonElement.innerText = ''; // Hide the order
    }

    showOrder() {
        this.buttonElement.innerText = this.order + 1; // Reveal the order
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
    }

    scrambleButtons(numScrambles) {
        const numButtons = this.buttonManager.numButtons;
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
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        this.buttonManager.buttons.forEach(button => {
            const randomTop = Math.floor(Math.random() * (windowHeight - 100));
            const randomLeft = Math.floor(Math.random() * (windowWidth - 100));
            button.setPosition(randomTop, randomLeft);
        });
    }
}

// Class to handle input and game start logic
class ButtonInputBox {
    constructor() {
        this.inputElement = this.createInputBox();
    }

    createInputBox() {
        // Create label
        const inputBoxLabel = document.createElement('label');
        inputBoxLabel.htmlFor = 'numButtons';
        inputBoxLabel.innerText = MESSAGES.userPromptMessage;

        // Create input field
        const inputBox = document.createElement('input');
        inputBox.id = 'numButtons';
        inputBox.type = 'number';
        inputBox.min = 3;
        inputBox.max = 7;
        inputBox.placeholder = 'Enter a number between 3 and 7';

        // Create button
        const startButton = document.createElement('button');
        startButton.id = 'startBtn';
        startButton.innerText = MESSAGES.goButtonText;

        // Append input elements to the document body
        document.body.appendChild(inputBoxLabel);
        document.body.appendChild(inputBox);
        document.body.appendChild(startButton);

        // Add event listener to the button
        startButton.addEventListener('click', () => this.onButtonClick());

        return inputBox;
    }

    getNumberOfButtons() {
        const value = parseInt(this.inputElement.value, 10);
        if (isNaN(value) || value < 3 || value > 7) {
            alert(MESSAGES.invalidInputMessage);
            return null;
        }
        return value;
    }

    onButtonClick() {
        const numButtons = this.getNumberOfButtons();
        if (numButtons !== null) {
            const buttonManager = new ButtonManager();
            const scrambleManager = new ScrambleManager(buttonManager);

            buttonManager.createButtons(numButtons);

            // Start scrambling after a pause of numButtons seconds
            setTimeout(() => {
                scrambleManager.scrambleButtons(numButtons);
            }, numButtons * 1000); // Wait n seconds before scrambling
        }
    }
}

// Initialize the input box and start the game
const inputBox = new ButtonInputBox();
