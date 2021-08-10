//Dependencies
const JSONStore = require('json-store-stats');
let db = JSONStore('../../db/db.json');
const fs = require('fs');
// ROUTING

module.exports = (app) => {
  // API GET Requests
  app.get('/api/notes', (req, res) => {
    let noteData = JSON.parse(db.getAll());
    res.json(noteData);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    let newNote = req.body;

  });

};
