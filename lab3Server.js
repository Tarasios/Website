const http = require('http');
const url = require('url');
const fileOperations = require('./modules/lab3FileOperations'); // OOP version of file operations
const lab3Utils = require('./modules/lab3Utils');  // OOP version of utils
const { greetingMessage } = require('./lang/messages/en/lab3Messages');

// Class for handling file operations
class FileHandler {
  // Method to append text to the file
  appendText(text, res) {
    fileOperations.appendToFile(text)  // Using OOP fileOperations class instance
      .then((message) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<p>${greetingMessage.replace('%s', message)}</p>`);
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<p>Error: ${err.message}</p>`);
      });
  }

  // Method to read the file content
  readFileContent(res) {
    fileOperations.readFile()  // Using OOP fileOperations class instance
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      })
      .catch(() => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<p>404: File not found</p>');
      });
  }
}

// Main server class
class Lab3Server {
  constructor(port) {
    this.port = port;
    this.fileHandler = new FileHandler();  // Create an instance of FileHandler
  }

  // Method to handle requests
  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/lab3/writeFile/' && query.text) {
      this.fileHandler.appendText(query.text, res);
    } else if (pathname === '/lab3/readFile/file.txt') {
      this.fileHandler.readFileContent(res);
    } else {
      this.send404(res);
    }
  }

  // Method to handle invalid paths
  send404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<p>404: Not Found</p>');
  }

  // Method to start the server
  start() {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(`Lab 3 server running on port ${this.port}`);
    });
  }
}

// Initialize and start the server
const lab3Server = new Lab3Server(3000);
lab3Server.start();
