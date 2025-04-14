// Inventory routes
const express = require('express')
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build inventory detail view
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildVehicleDetail))

// Make sure all route handlers are functions
// If you have any other routes that might be causing issues, check them here

module.exports = router