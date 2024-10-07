/*
    This JavaScript code was generated with the assistance of ChatGPT.
    ChatGPT-4.0 (https://chat.openai.com/) was used to code solutions presented in this assignment.
*/

let messages = {};

function loadMessages() {
    fetch('lang/messages/en/lab4Messages.json')
        .then(response => response.json())
        .then(data => {
            messages = data;
            populateText();
            addEventListeners();
        })
        .catch(error => console.error('Error loading messages:', error));
}

function populateText() {
    // Set the text content of the elements using messages
    document.getElementById('createDefinitionTitle').textContent = messages.createDefinitionTitle;
    document.getElementById('wordLabel').textContent = messages.wordLabel;
    document.getElementById('definitionLabel').textContent = messages.definitionLabel;
    document.getElementById('submitButton').textContent = messages.submitButton;
    document.getElementById('searchDefinitionTitle').textContent = messages.searchDefinitionTitle;
    document.getElementById('searchLabel').textContent = messages.searchLabel;
    document.getElementById('searchButton').textContent = messages.searchButton;
}

function addEventListeners() {
    document.getElementById('submitButton').addEventListener('click', createDefinition);
    document.getElementById('searchButton').addEventListener('click', searchDefinition);
}

function createDefinition() {
    const word = document.getElementById('wordInput').value.trim();
    const definition = document.getElementById('definitionInput').value.trim();
    const resultElement = document.getElementById('createDefinitionResult');

    // Input validation: accept only non-empty strings, disallow numbers
    const wordIsValid = /^[a-zA-Z'-]+$/.test(word);
    const definitionIsValid = definition.length > 0;

    if (!wordIsValid) {
        resultElement.textContent = messages.emptyWordError;
        return;
    }

    if (!definitionIsValid) {
        resultElement.textContent = messages.emptyDefinitionError;
        return;
    }

    // Prepare data for POST request
    const data = {
        word: word,
        definition: definition
    };

    // Send POST request to the API server
    fetch('https://yourDomainName2.wyz/api/definitions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response
        if (data.success) {
            resultElement.textContent = messages.requestNumber + ' ' + data.requestNumber + '. ' + messages.successMessage;
        } else if (data.message === 'Word already exists') {
            resultElement.textContent = messages.requestNumber + ' ' + data.requestNumber + '. ' + messages.definitionExistsMessage;
        } else {
            resultElement.textContent = messages.errorMessage;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultElement.textContent = messages.errorMessage;
    });
}

function searchDefinition() {
    const word = document.getElementById('searchInput').value.trim();
    const resultElement = document.getElementById('searchResult');

    // Input validation: accept only non-empty strings, disallow numbers
    const wordIsValid = /^[a-zA-Z'-]+$/.test(word);

    if (!wordIsValid) {
        resultElement.textContent = messages.emptyWordError;
        return;
    }

    // Send GET request to the API server
    fetch('https://yourDomainName2.wyz/api/definitions/?word=' + encodeURIComponent(word))
    .then(response => response.json())
    .then(data => {
        // Handle the response
        if (data.success && data.definition) {
            resultElement.textContent = messages.requestNumber + ' ' + data.requestNumber + '. ' + word + ': ' + data.definition;
        } else if (data.message === 'Word not found') {
            const notFoundMessage = messages.definitionNotFoundMessage.replace('{{word}}', word);
            resultElement.textContent = messages.requestNumber + ' ' + data.requestNumber + '. ' + notFoundMessage;
        } else {
            resultElement.textContent = messages.errorMessage;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultElement.textContent = messages.errorMessage;
    });
}

window.onload = loadMessages;
