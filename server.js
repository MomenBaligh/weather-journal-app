// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Handle GET requests to the '/' endpoint
app.get('/', (_, res) => {
  res.status(200).send(projectData);
});

// Handle POST requests to the '/' endpoint
app.post('/', (req, res) => {
  const { temp, date, feedback } = req.body;
  projectData = { temp, date, feedback };

  res.status(200).send({
    success: true,
    message: 'Data was saved successfully.',
    data: projectData
  });
});

// Setup Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`);
  console.log('To close the server, press Ctrl + c.');
});
