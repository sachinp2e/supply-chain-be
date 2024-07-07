const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const CREDS_FILE = './creds.json';

app.post('/add-creds', (req, res) => {
  const newCreds = req.body;
  fs.readFile(CREDS_FILE, (err, data) => {
    if (err) {
      return res.status(500).send('Error reading credentials file.');
    }
    const credsList = JSON.parse(data || '[]');
    credsList.push(newCreds);
    fs.writeFile(CREDS_FILE, JSON.stringify(credsList, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing to credentials file.');
      }
      res.status(200).send('Credentials added successfully.');
    });
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
