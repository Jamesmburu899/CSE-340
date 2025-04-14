// Inventory routes
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build vehicle detail view
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildVehicleDetail))

// Add direct routes for Sedan, SUV, and Truck pages
router.get("/sedan", utilities.handleErrors(invController.buildSedanView))
router.get("/suv", utilities.handleErrors(invController.buildSUVView))
router.get("/truck", utilities.handleErrors(invController.buildTruckView))

module.exports = router