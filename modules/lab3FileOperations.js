const fs = require('fs');
const path = require('path');

class FileOperations {
  constructor() {
    this.filePath = path.join(__dirname, '..', 'file.txt');
  }

  // Method to append text to the file
  appendToFile(text) {
    return new Promise((resolve, reject) => {
      fs.appendFile(this.filePath, text + '\n', (err) => {
        if (err) reject(err);
        else resolve(`Successfully appended text: ${text}`);
      });
    });
  }

  // Method to read the file content
  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            reject(new Error(`404: File not found - ${this.filePath}`));
          } else {
            reject(err);
          }
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = new FileOperations();
