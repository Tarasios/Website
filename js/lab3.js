// Helper class to manage dynamic text and content
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
  
    // Load messages dynamically from lab3Messages.js
    loadMessages() {
      return fetch('/lang/messages/en/lab3Messages.js')
        .then(response => response.json())
        .catch(err => {
          console.error('Error loading messages:', err);
          throw new Error('Failed to load messages');
        });
    }
  
    // Update the DOM with messages
    updateDOM(messages) {
      Object.keys(this.elementsMap).forEach(key => {
        const elementId = this.elementsMap[key];
        const element = document.getElementById(elementId);
        if (element) {
          element.textContent = messages[key];
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
            alert('Failed to append text.');
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
            this.loadMessages().then(messages => {
              alert(messages.fileNotFoundError);
            });
          });
      });
    }
  
    // Initialize the page
    init() {
      this.loadMessages().then((messages) => {
        this.updateDOM(messages);
        this.handleFormSubmit();
        this.handleReadFile();
      });
    }
  }
  
  // Initialize the page when the DOM content is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    const lab3Page = new Lab3Page();
    lab3Page.init();
  });
  