/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors({origin: true}));

// Middleware to parse JSON bodies
app.use(express.json());

// Define the `/chat` POST endpoint
app.post("/chat", (req, res) => {
  const {message} = req.body;

  if (!message) {
    return res.status(400).json({error: "Message is required"});
  }

  res.json({reply: `You said: ${message}`});
});

// Export the Express app as an API function
exports.api = onRequest(app);

