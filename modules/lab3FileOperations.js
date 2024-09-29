// lab3FileOperations.js
const fs = require('fs');
const path = require('path');

class Lab3FileOperations {
  constructor(filename) {
    this.filename = filename;
    this.filePath = path.join(__dirname, '..', this.filename);
  }

  appendText(text) {
    return new Promise((resolve, reject) => {
      fs.appendFile(this.filePath, `${text}\n`, (err) => {
        if (err) reject(err);
        else resolve(text);
      });
    });
  }

  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  fileExists() {
    return fs.existsSync(this.filePath);
  }
}

module.exports = Lab3FileOperations;
