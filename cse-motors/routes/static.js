const express = require('express');
const router = express.Router();

// Sample static route
router.get('/', (req, res) => {
  res.send('Welcome to CSE Motors!');
});

module.exports = router; // Ensure the router is exported
