//Dependencies
const fs = require('fs');
// ROUTING

module.exports = (app) => {
  // API GET Requests
  app.get('/api/notes', (req, res) => {
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
      if (err) {
        throw err;
      };
      let notes = JSON.parse(data);
      notes.forEach((note, id) => {
        note.id = id++;
      });
      return res.send(notes);
    });
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    fs.readFile('../../db/db.json', 'utf8', (err, data) => {
      if(err) {
        throw err;
      };
      let database;
       if (data != undefined) { 
         database = JSON.parse(data)
        } else {
          database = [];
        };
        let newNote = {
          id: `${database.length}`,
          title: `${req.body.title}`,
          text: `${req.body.text}`
        };

        database.push(newNote);
        let db = JSON.stringify(database, null, 1);

        fs.writeFile('../../db/db.json', db, (err, data) => {
          if(err) {
            throw err;
          };
          console.log('Note added');
          return res.send(newNote);
        });
    });
  });

};
