import MESSAGES from '../lang/messages/en/lab3Messages.js';

// Cloud Function URL (replace with your deployed URL)
const cloudFunctionURL = 'https://lab3-ot2n9d6hq-tarasios-projects.vercel.app';

class Lab3Page {
    constructor() {
        this.elementsMap = {
            pageTitle: 'pageTitle',
            pageHeader: 'pageHeader',
            enterTextLabel: 'enterTextLabel',
            appendButton: 'appendButton',
            readButton: 'readFileButton'
        };
    }

    // Method to update the DOM with messages
    updateDOM() {
        Object.keys(this.elementsMap).forEach(key => {
            const elementId = this.elementsMap[key];
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = MESSAGES[key];
            }
        });
    }

    // Handle form submission to send text to Cloud Function
    handleFormSubmit() {
        const form = document.getElementById('writeForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = document.getElementById('text').value;

            fetch(`${cloudFunctionURL}/api/server?text=${encodeURIComponent(text)}`)
                .then(response => response.json())
                .then(data => {
                    alert(data.message);  // Alert success message from the Cloud Function
                })
                .catch(err => {
                    console.error('Error:', err);
                    alert(MESSAGES.fileNotFoundError);  // Display error message
                });
        });
    }

    // Initialize the page
    init() {
        this.updateDOM();
        this.handleFormSubmit();
    }
}

// Initialize the page when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const lab3Page = new Lab3Page();
    lab3Page.init();
});
