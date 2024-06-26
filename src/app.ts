// Create a new express application
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

// Add middleware to parse JSON
app.use(express.json());
app.use(cors());

// Register the controller
import Controller from "./controllers/Controller";
app.use('/', Controller);

// Start the server
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});