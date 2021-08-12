const express = require('express');
const routes = require('./router.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
