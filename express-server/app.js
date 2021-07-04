require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Load port from environment
const PORT = 8080;

// Express Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));

// Sample GET route -- move routes to new folder
app.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${PORT}.`);
});
