const express = require("express")
const router = express.Router()
const errorController = require("../controllers/errorController")
const utilities = require("../utilities/")

// Route to trigger 500 error
router.get("/trigger", errorController.trigger500Error)

module.exports = router