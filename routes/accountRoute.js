const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')

// Route to account management
router.get("/", utilities.checkLogin, accountController.buildAccountManagement)

// Routes for account update
router.get("/update/:accountId", utilities.checkLogin, accountController.buildAccountUpdate)
router.post("/update", 
  utilities.checkLogin,
  regValidate.updateAccountRules(),
  regValidate.checkUpdateData,
  accountController.updateAccount
)

// Route for password update
router.post("/update-password",
  utilities.checkLogin,
  regValidate.passwordRules(),
  regValidate.checkPassword,
  accountController.updatePassword
)

// Logout route
router.get("/logout", utilities.handleLogout)

module.exports = router