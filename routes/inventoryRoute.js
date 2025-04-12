const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")

// Management routes
router.get("/", invController.buildManagement)
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", validate.classificationRules(), invController.addClassification)
router.get("/add-inventory", invController.buildAddInventory)
router.post("/add-inventory", validate.inventoryRules(), invController.addInventory)

// Route for classification view
router.get("/type/:classificationId", invController.buildByClassification)

// Route for detail view
router.get("/detail/:invId", invController.buildByInventoryId)

// Route for intentional error
router.get("/trigger-error", invController.triggerError)

// Route to test database connection
router.get("/test-db", invController.testConnection)

module.exports = router