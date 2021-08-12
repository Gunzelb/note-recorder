//Dependencies
const path = require('path');

//Routing
module.exports = (app) => {
//Notes route
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  // Home route
  app.get('*', (req, res) => {
    debugger;
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
