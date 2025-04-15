// Account routes
const express = require('express')
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const validate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Route to process login attempt
router.post(
  "/login",
  validate.loginRules(),
  validate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Route to process registration
router.post(
  "/register",
  validate.registrationRules(),
  validate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Route to build account management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

// Route to build account update view
router.get("/update/:accountId", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountUpdate))

// Route to process account update
router.post(
  "/update",
  utilities.checkLogin,
  validate.updateAccountRules(),
  validate.checkAccountData,
  utilities.handleErrors(accountController.updateAccount)
)

// Route to process password update
router.post(
  "/update-password",
  utilities.checkLogin,
  validate.passwordRules(),
  validate.checkPassword,
  utilities.handleErrors(accountController.updatePassword)
)

// Route to process logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

module.exports = router