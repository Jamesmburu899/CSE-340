const { body, validationResult } = require("express-validator")
const utilities = require(".")
const accountModel = require("../models/account-model")

const validate = {}

/* ******************************
 * Login Data Validation Rules
 * ***************************** */
validate.loginRules = () => {
  return [
    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),

    body("account_password")
      .trim()
      .isLength({ min: 12 })
      .withMessage("Password must be at least 12 characters long.")
  ]
}

/* ******************************
 * Check Login Data
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    })
    return
  }
  next()
}

/* ******************************
 * Registration Data Validation Rules
 * ***************************** */
validate.registrationRules = () => {
  return [
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."),

    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."),

    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
      .custom(async (account_email) => {
        const emailExists = await accountModel.checkExistingEmail(account_email)
        if (emailExists) {
          throw new Error("Email exists. Please use a different email")
        }
      }),

    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements.")
  ]
}

/* ******************************
 * Check Registration Data
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    })
    return
  }
  next()
}

/* ******************************
 * Update Account Data Validation Rules
 * ***************************** */
validate.updateAccountRules = () => {
  return [
    body("account_firstname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name.")
      .matches(/^[\w\s-]+$/)
      .withMessage("First name contains invalid characters"),

    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name.")
      .matches(/^[\w\s-]+$/)
      .withMessage("Last name contains invalid characters"),

    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
      .custom(async (account_email, { req }) => {
        const account_id = req.body.account_id
        const emailExists = await accountModel.checkExistingEmail(account_email)
        if (emailExists && emailExists.account_id.toString() !== account_id) {
          throw new Error("Email exists. Please use a different email")
        }
      }),
  ]
}

/* ******************************
 * Check Account Data and return errors or continue to update
 * ***************************** */
validate.checkAccountData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const accountData = await accountModel.getAccountById(account_id)
    res.render("account/update", {
      errors,
      title: "Update Account",
      nav,
      accountData: {
        ...accountData,
        account_firstname,
        account_lastname,
        account_email,
      },
    })
    return
  }
  next()
}

/* ******************************
 * Password Validation Rules
 * ***************************** */
validate.passwordRules = () => {
  return [
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password must be at least 12 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.")
      .custom((value, { req }) => {
        if (value.toLowerCase().includes(req.body.account_firstname?.toLowerCase()) ||
            value.toLowerCase().includes(req.body.account_lastname?.toLowerCase())) {
          throw new Error("Password cannot contain your name")
        }
        return true
      })
  ]
}

/* ******************************
 * Check password and return errors or continue
 * ***************************** */
validate.checkPassword = async (req, res, next) => {
  const { account_password, account_id } = req.body
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    const accountData = await accountModel.getAccountById(account_id)
    res.render("account/update", {
      errors,
      title: "Update Account",
      nav,
      accountData,
    })
    return
  }
  next()
}

module.exports = validate