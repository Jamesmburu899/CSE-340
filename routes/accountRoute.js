const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require("../utilities/account-validation")


// Route to handle account management view
router.get("/", utilities.handleErrors(utilities.checkLogin), utilities.handleErrors(accountController.buildAccountManagement))

// Routes for account update
router.get("/update/:accountId", utilities.handleErrors(utilities.checkLogin), utilities.handleErrors(accountController.buildAccountUpdate))
router.post("/update", 
  utilities.handleErrors(utilities.checkLogin),
  regValidate.updateRules(),
  utilities.handleErrors(regValidate.checkUpdateData),
  utilities.handleErrors(accountController.updateAccount)
)

// Route for password update
router.post("/update-password",
  utilities.handleErrors(utilities.checkLogin),
  regValidate.passwordRules(),
  utilities.handleErrors(regValidate.checkPassword),
  utilities.handleErrors(accountController.updatePassword)
)

// Logout route
router.get("/logout", utilities.handleErrors(utilities.handleLogout))

// Account activity route
router.get("/activity/:accountId", utilities.checkLogin, accountController.buildAccountActivity)

module.exports = router