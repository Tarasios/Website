// Programming support provided by: ChatGPT
import MESSAGES from '../../lang/messages/en/lab1Messages.js';

// Class to handle student name input and storage
class Student {
    constructor() {
        this.studentNameElement = document.getElementById("studentName");
        this.nameInputElement = document.getElementById("nameInput");
        this.saveButton = document.getElementById("saveNameButton");

        // Set placeholders and button text dynamically
        this.nameInputElement.placeholder = MESSAGES.nameInputPlaceholder;
        this.saveButton.textContent = MESSAGES.saveNameButtonText;

        // Load the student name from localStorage
        this.loadStudentName();
        this.attachSaveButtonHandler();
    }

    // Load student name from localStorage and update the UI
    loadStudentName() {
        const savedName = localStorage.getItem("studentName");
        this.studentNameElement.textContent = savedName
            ? `Student: ${savedName}`
            : MESSAGES.defaultStudentName;
    }

    // Attach handler to save name to localStorage on button click
    attachSaveButtonHandler() {
        this.saveButton.onclick = () => {
            const nameInput = this.nameInputElement.value;
            if (nameInput) {
                localStorage.setItem("studentName", nameInput);
                this.studentNameElement.textContent = `Student: ${nameInput}`;
            } else {
                alert(MESSAGES.invalidNameMessage);  // No hardcoded strings, alert from MESSAGES
            }
        };
    }
}

// Class to manage notes in writer.html
class Note {
    constructor(content = "") {
        this.content = content;
        this.id = Date.now();
    }

    // Remove the note from DOM and localStorage
    remove() {
        document.getElementById(`note-${this.id}`).remove();
        Note.removeNoteFromStorage(this.id);
    }

    // Save note to localStorage
    save() {
        const notes = Note.getNotesFromStorage();
        const noteIndex = notes.findIndex(note => note.id === this.id);
        if (noteIndex > -1) {
            notes[noteIndex].content = this.content;
        } else {
            notes.push(this);
        }
        Note.saveNotesToStorage(notes);
    }

    // Static method to get notes from localStorage
    static getNotesFromStorage() {
        return JSON.parse(localStorage.getItem("notes")) || [];
    }

    // Static method to save notes to localStorage
    static saveNotesToStorage(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
        document.getElementById("lastSaved").textContent = `${MESSAGES.lastSavedText} ${new Date().toLocaleTimeString()}`;
    }

    // Static method to remove a note from localStorage
    static removeNoteFromStorage(noteId) {
        let notes = Note.getNotesFromStorage();
        notes = notes.filter(note => note.id !== noteId);
        Note.saveNotesToStorage(notes);
    }

    // Static method to load existing notes and display them in writer.html
    static loadNotes() {
        const notes = Note.getNotesFromStorage();
        notes.forEach(note => Note.addNoteUI(new Note(note.content)));
    }

    // Static method to add a note dynamically in writer.html
    static addNoteUI(note) {
        const noteContainer = document.getElementById("noteContainer");
        const noteDiv = document.createElement("div");
        noteDiv.id = `note-${note.id}`;

        const textArea = document.createElement("textarea");
        textArea.value = note.content;
        textArea.oninput = () => {
            note.content = textArea.value;
            note.save();
        };

        const removeButton = document.createElement("button");
        removeButton.textContent = MESSAGES.removeButtonText;
        removeButton.onclick = () => note.remove();

        noteDiv.appendChild(textArea);
        noteDiv.appendChild(removeButton);
        noteContainer.appendChild(noteDiv);
    }
}

// Class to handle reader.html functionality
class Reader {
    constructor() {
        this.displayContainer = document.getElementById("displayNotes");
    }

    // Display notes from localStorage in reader.html
    displayNotes() {
        this.displayContainer.innerHTML = ""; // Clear previous content
        const notes = Note.getNotesFromStorage();
        notes.forEach(note => {
            const p = document.createElement("p");
            p.textContent = note.content;
            this.displayContainer.appendChild(p);
        });
        document.getElementById("lastRetrieved").textContent = `${MESSAGES.lastUpdatedText} ${new Date().toLocaleTimeString()}`;
    }
}

// Class to handle setting text in UI elements (messages)
class UI {
    // Apply MESSAGES to UI elements for writer and reader pages
    static applyUITexts() {
        if (window.location.pathname.includes("writer.html")) {
            document.getElementById("addNote").textContent = MESSAGES.addButtonText;
            document.getElementById("backButton").textContent = MESSAGES.backButtonText;
            document.getElementById("backButton").onclick = () => window.location.href = 'lab1.html';
        }

        if (window.location.pathname.includes("reader.html")) {
            document.getElementById("backButton").textContent = MESSAGES.backButtonText;
            document.getElementById("backButton").onclick = () => window.location.href = 'lab1.html';
        }
    }
}

// Class to handle the lab1.html landing page
class LabLanding {
    constructor() {
        document.getElementById("pageTitle").textContent = MESSAGES.pageTitle;

        const writerPageButton = document.getElementById("writerPage");
        writerPageButton.textContent = MESSAGES.writerPageLinkText;
        writerPageButton.onclick = () => window.location.href = 'writer.html';

        const readerPageButton = document.getElementById("readerPage");
        readerPageButton.textContent = MESSAGES.readerPageLinkText;
        readerPageButton.onclick = () => window.location.href = 'reader.html';
    }
}

// Initialize the appropriate class based on the current page
document.addEventListener("DOMContentLoaded", () => {
    // If on lab1.html, initialize the landing page and student input
    if (window.location.pathname.includes("lab1.html")) {
        new LabLanding();
        new Student();
    }

    // If on writer.html, initialize note handling
    if (window.location.pathname.includes("writer.html")) {
        Note.loadNotes();
        setInterval(() => Note.saveNotesToStorage(Note.getNotesFromStorage()), 2000);
        document.getElementById("addNote").onclick = () => Note.addNoteUI(new Note());
        UI.applyUITexts();
    }

    // If on reader.html, initialize note display
    if (window.location.pathname.includes("reader.html")) {
        const reader = new Reader();
        setInterval(() => reader.displayNotes(), 2000);
        UI.applyUITexts();
    }
});
