// User input for number of buttons
const userPromptMessage = "How many buttons to create?";
let messages = {}; // We will load this from /lang/messages/en/user.js

// Class to handle game button creation
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

    getNumButtonsFromUser() {
        let num = parseInt(prompt(messages.userPromptMessage));
        while (isNaN(num) || num < 3 || num > 7) {
            num = parseInt(prompt(messages.invalidInputMessage));
        }
        return num;
    }

    createButtons(n) {
        this.numButtons = n;
        this.removeExistingButtons();
        for (let i = 0; i < n; i++) {
            const randomColor = this.getRandomColor();
            const button = new GameButton(randomColor, i);
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
                alert(messages.successMessage);
            }
        } else {
            alert(messages.failureMessage);
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

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
