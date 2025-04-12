const express = require('express')
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to handle inventory by classification
router.get("/type/:classificationId", invController.buildByClassification)

// Route to handle individual inventory detail view
router.get("/detail/:inventoryId", invController.buildByInventoryId)

module.exports = router