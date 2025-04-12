const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route for classification view
router.get("/type/:classificationId", invController.buildByClassification)

// Route for detail view
router.get("/detail/:invId", invController.buildByInventoryId)

// Route for intentional error
router.get("/trigger-error", invController.triggerError)

module.exports = router