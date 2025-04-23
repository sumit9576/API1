const express = require('express');
const bodyParser = require('body-parser');
const schoolRoutes = require('../routes/school'); // Adjust path if needed
const { database } = require('../config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', schoolRoutes);

// Serverless handler
let isConnected = false; // Prevent DB reconnect on every request

const handler = async (req, res) => {
  if (!isConnected) {
    try {
      await database();
      console.log("Database connected successfully");
      isConnected = true;
    } catch (err) {
      console.error("Database connection failed", err);
      res.status(500).send("Database connection error");
      return;
    }
  }

  return app(req, res); // Pass the request to Express
};

module.exports = handler;
