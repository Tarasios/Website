// server.js
const cors = require('cors');
const express = require('express');
const path = require('path');
const Lab3FileOperations = require('./modules/lab3FileOperations');
console.log('Lab3FileOperations:', Lab3FileOperations);
const app = express();
const PORT = process.env.PORT || 80;

// Load messages
const messages = require('./public/lang/messages/en/lab3Messages.json');

// Use CORS
app.use(cors());

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// C.1: Append text to file.txt
app.get('/writeFile', async (req, res) => {
  const { text } = req.query;
  const fileOps = new Lab3FileOperations('file.txt');

  if (!text) {
    res.status(400).send(messages.badRequestTextRequired);
    return;
  }

  try {
    await fileOps.appendText(text);
    res.status(200).send(messages.appendedText.replace('%s', text));
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.internalServerError);
  }
});

// C.2: Read file.txt
app.get('/readFile/:filename', async (req, res) => {
  const { filename } = req.params;
  const fileOps = new Lab3FileOperations(filename);

  if (filename !== 'file.txt') {
    res.status(404).send(messages.fileNotFound.replace('%s', filename));
    return;
  }

  if (!fileOps.fileExists()) {
    res.status(404).send(messages.fileNotFound.replace('%s', filename));
    return;
  }

  try {
    const data = await fileOps.readFile();
    res.status(200).send(`<pre>${data}</pre>`);
  } catch (err) {
    console.error(err);
    res.status(500).send(messages.internalServerError);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
