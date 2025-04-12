const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")

// Management routes
router.get("/", invController.buildManagement)
router.get("/add-classification", invController.buildAddClassification)
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkValidation,
  invController.addClassification
)

router.get("/add-inventory", invController.buildAddInventory)
router.post(
  "/add-inventory",
  validate.inventoryRules(),
  validate.checkValidation,
  invController.addInventory
)

// Route for classification view
router.get("/type/:classificationId", invController.buildByClassification)

// Route for detail view
router.get("/detail/:invId", invController.buildByInventoryId)

// Route for intentional error
router.get("/trigger-error", invController.triggerError)

// Route to test database connection
router.get("/test-db", invController.testConnection)

// Classification edit/delete routes
router.get("/edit-classification/:classification_id", invController.buildEditClassification)
router.post("/update-classification", validate.classificationRules(), validate.checkValidation, invController.updateClassification)
router.get("/delete-classification/:classification_id", invController.deleteClassification)

// Inventory edit/delete routes
router.get("/edit-inventory/:inv_id", invController.buildEditInventory)
router.post("/update-inventory", validate.inventoryRules(), validate.checkValidation, invController.updateInventory)
router.get("/delete-inventory/:inv_id", invController.deleteInventory)

module.exports = router