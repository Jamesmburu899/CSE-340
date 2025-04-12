const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")
const checkJWTToken = require("../utilities/checkJWTToken")

// Protected routes - require Employee or Admin access
router.get("/", checkJWTToken, utilities.checkAccountType, invController.buildManagement)
router.get("/add-classification", checkJWTToken, utilities.checkAccountType, invController.buildAddClassification)
router.post(
  "/add-classification",
  checkJWTToken,
  utilities.checkAccountType,
  validate.classificationRules(),
  validate.checkValidation,
  invController.addClassification
)
router.get("/add-inventory", checkJWTToken, utilities.checkAccountType, invController.buildAddInventory)
router.post(
  "/add-inventory",
  checkJWTToken,
  utilities.checkAccountType,
  validate.inventoryRules(),
  validate.checkValidation,
  invController.addInventory
)

// Public routes - no authentication required
router.get("/type/:classificationId", invController.buildByClassification)
router.get("/detail/:invId", invController.buildByInventoryId)

// Protected routes for editing and deleting
router.get("/edit/:inv_id", checkJWTToken, utilities.checkAccountType, invController.buildEditInventory)
router.post("/update", checkJWTToken, utilities.checkAccountType, validate.inventoryRules(), validate.checkValidation, invController.updateInventory)
router.get("/delete/:inv_id", checkJWTToken, utilities.checkAccountType, invController.deleteInventory)

module.exports = router