// Account routes
const express = require('express')
const router = new express.Router()
const baseController = require("../controllers/baseController")
const utilities = require("../utilities/")

// Route to build login view
router.get("/login", utilities.handleErrors(baseController.buildLogin))

// Route to build registration view
router.get("/register", utilities.handleErrors(baseController.buildRegister))

// Route to build account management view
router.get("/", utilities.handleErrors(baseController.buildAccountManagement))

module.exports = router