const express = require('express')
const router = express.Router()

// Static Routes
// Set up "public" folder/directory for static files
router.use(express.static("public"))

module.exports = router