import MESSAGES from '../lang/messages/en/lab3Messages.js';

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

  // Update the DOM with messages
  updateDOM() {
    Object.keys(this.elementsMap).forEach(key => {
      const elementId = this.elementsMap[key];
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = MESSAGES[key];
      }
    });
  }

  // Handle form submission to append text to file
  handleFormSubmit() {
    const form = document.getElementById('writeForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = document.getElementById('text').value;
      fetch(`/lab3/writeFile/?text=${encodeURIComponent(text)}`)
        .then(response => response.text())
        .then(data => {
          alert(data);
        })
        .catch(err => {
          console.error('Error appending text to file:', err);
          alert(MESSAGES.appendSuccessMessage);
        });
    });
  }

  // Handle button click to read file contents
  handleReadFile() {
    const readButton = document.getElementById('readFileButton');
    readButton.addEventListener('click', () => {
      fetch('/lab3/readFile/file.txt')
        .then(response => {
          if (!response.ok) {
            throw new Error('File not found');
          }
          return response.text();
        })
        .then(data => {
          document.getElementById('fileContent').textContent = data;
        })
        .catch(err => {
          console.error('Error reading file:', err);
          alert(MESSAGES.fileNotFoundError);
        });
    });
  }

  // Initialize the page
  init() {
    this.updateDOM();
    this.handleFormSubmit();
    this.handleReadFile();
  }
}

// Initialize the page when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const lab3Page = new Lab3Page();
  lab3Page.init();
});
