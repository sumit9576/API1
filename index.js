// api/index.js
const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('../routes/school'); // adjust the path as needed
const app = express();

app.use(bodyParser.json());
app.use('/API', schoolRoutes);

// Export the handler
module.exports = app;
