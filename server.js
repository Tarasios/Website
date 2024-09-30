// server.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const Lab3FileOperations = require('./modules/lab3FileOperations');
const Lab3Utils = require('./modules/lab3Utils');
const messages = require('./public/lang/messages/en/lab3Messages.json');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 80;
    this.setupMiddleware();
    this.setupControllers();
  }

  setupMiddleware() {
    // Use CORS
    this.app.use(cors());

    // Set up EJS as the templating engine
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    // Serve static files
    this.app.use('/css', express.static(path.join(__dirname, 'public/css')));
    this.app.use('/js', express.static(path.join(__dirname, 'public/js')));
    this.app.use('/lang', express.static(path.join(__dirname, 'public/lang')));
  }

  setupControllers() {
    const lab3Controller = new Lab3Controller();
    this.app.use('/', lab3Controller.router);
  }

  start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}

class Lab3Controller {
  constructor() {
    this.router = express.Router();
    this.lab3FileOperations = new Lab3FileOperations('file.txt');
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/writeFile', this.handleWriteFile.bind(this));
    this.router.get('/readFile/:filename', this.handleReadFile.bind(this));
    this.router.get('/lab3.html', this.renderLab3.bind(this));
  }

  handleWriteFile(req, res) {
    const { text } = req.query;

    if (!text) {
      res.status(400).send(messages.badRequestTextRequired);
      return;
    }

    this.lab3FileOperations
      .appendText(text)
      .then(() => {
        res.status(200).send(messages.appendedText.replace('%s', text));
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(messages.internalServerError);
      });
  }

  handleReadFile(req, res) {
    const { filename } = req.params;

    if (filename !== 'file.txt') {
      res.status(404).send(messages.fileNotFound.replace('%s', filename));
      return;
    }

    if (!this.lab3FileOperations.fileExists()) {
      res.status(404).send(messages.fileNotFound.replace('%s', filename));
      return;
    }

    this.lab3FileOperations
      .readFile()
      .then((data) => {
        res.status(200).send(`<pre>${data}</pre>`);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(messages.internalServerError);
      });
  }

  // server.js (Lab3Controller class)
  renderLab3(req, res) {
    const { name } = req.query;
    let greeting = null;

    if (name) {
      const lab3Utils = new Lab3Utils(name, messages);
      greeting = lab3Utils.getDate();
    }

    res.render('lab3', { greeting });
  }

}

// Instantiate and start the server
const server = new Server();
server.start();
