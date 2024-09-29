// api/server.js

const allowCors = (fn) => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');  // Adjust origin as necessary
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    return await fn(req, res);
};

import fileOperations from '../modules/fileOperations.js';  // Adjust path as necessary
import MESSAGES from '../locals/en/en.js';  // Adjust path as necessary

// Class for handling file operations
class FileHandler {
    async appendText(text, res) {
        try {
            const message = await fileOperations.appendToFile(text);
            res.status(200).json({ message: MESSAGES.appendSuccessMessage.replace('%s', message) });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async readFileContent(res) {
        try {
            const data = await fileOperations.readFile();
            res.status(200).send(data);
        } catch (err) {
            res.status(404).json({ error: MESSAGES.fileNotFoundError });
        }
    }
}

// Main function to handle requests
const handler = async (req, res) => {
    const fileHandler = new FileHandler();
    const { query, url, method } = req;

    if (url.includes('/lab3/writeFile') && method === 'GET' && query.text) {
        return fileHandler.appendText(query.text, res);
    } else if (url.includes('/lab3/readFile/file.txt')) {
        return fileHandler.readFileContent(res);
    } else {
        res.status(404).json({ error: MESSAGES.fileNotFoundError });
    }
};

// Export with CORS enabled
export default allowCors(handler);
