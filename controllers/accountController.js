const accountModel = require("../models/account-model")
const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const accountController = {}

accountController.buildAccountManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  const accountData = res.locals.accountData
  res.render("./account/management", {
    title: "Account Management",
    nav,
    errors: null,
    accountData
  })
}

accountController.buildAccountUpdate = async function (req, res, next) {
  let nav = await utilities.getNav()
  const accountId = parseInt(req.params.accountId)
  
  // Check if the logged-in user matches the requested account
  if (res.locals.accountData.account_id !== accountId) {
    req.flash("notice", "Access denied")
    return res.redirect("/account/")
  }
  
  const accountData = await accountModel.getAccountById(accountId)
  if (!accountData) {
    req.flash("notice", "Account not found")
    return res.redirect("/account/")
  }
  
  res.render("./account/update", {
    title: "Update Account",
    nav,
    errors: null,
    accountData,
  })
}

/* ****************************************
*  Process Account Update
* *************************************** */
accountController.updateAccount = async function (req, res, next) {
  const { account_id, account_firstname, account_lastname, account_email } = req.body
  
  // Check if the logged-in user matches the account being updated
  if (res.locals.accountData.account_id !== parseInt(account_id)) {
    req.flash("notice", "Access denied")
    return res.redirect("/account/")
  }
  
  try {
    const updateResult = await accountModel.updateAccount(
      account_id,
      account_firstname,
      account_lastname,
      account_email
    )

    if (updateResult) {
      const accountData = await accountModel.getAccountById(account_id)
      // Update JWT with new account data
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      req.flash("notice", "Account updated successfully.")
      res.redirect("/account/")
    } else {
      req.flash("notice", "Update failed.")
      res.status(501).redirect("/account/update/" + account_id)
    }
  } catch (error) {
    req.flash("notice", "Update failed.")
    res.status(501).redirect("/account/update/" + account_id)
  }
}

/* ****************************************
*  Process Password Update
* *************************************** */
accountController.updatePassword = async function (req, res, next) {
  const { account_id, account_password } = req.body

  // Check if the logged-in user matches the account being updated
  if (res.locals.accountData.account_id !== parseInt(account_id)) {
    req.flash("notice", "Access denied")
    return res.redirect("/account/")
  }

  try {
    const hashedPassword = await bcrypt.hashSync(account_password, 10)
    const updateResult = await accountModel.updatePassword(account_id, hashedPassword)

    if (updateResult) {
      // Update JWT with new account data
      const accountData = await accountModel.getAccountById(account_id)
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      req.flash("notice", "Password updated successfully.")
      res.redirect("/account/")
    } else {
      req.flash("notice", "Password update failed.")
      res.status(501).redirect("/account/update/" + account_id)
    }
  } catch (error) {
    req.flash("notice", "Password update failed.")
    res.status(501).redirect("/account/update/" + account_id)
  }
}

/* ****************************************
*  Build Account Activity View
* *************************************** */
accountController.buildAccountActivity = async function (req, res, next) {
  const account_id = req.params.accountId
  let nav = await utilities.getNav()
  
  try {
    const accountData = await accountModel.getAccountById(account_id)
    res.render("./account/activity", {
      title: "Account Activity",
      nav,
      accountData,
      errors: null,
    })
  } catch (error) {
    req.flash("notice", "Error fetching account activity")
    res.redirect("/account")
  }
}

/* ****************************************
*  Build Login View
* *************************************** */
accountController.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Login
* *************************************** */
accountController.accountLogin = async function (req, res) {
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav: await utilities.getNav(),
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      return res.redirect("/account/")
    }
  } catch (error) {
    return new Error('Access Forbidden')
  }
  req.flash("notice", "Please check your credentials and try again.")
  res.status(400).render("account/login", {
    title: "Login",
    nav: await utilities.getNav(),
    errors: null,
    account_email,
  })
}

/* ****************************************
*  Build Registration View
* *************************************** */
accountController.buildRegister = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
accountController.registerAccount = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you're registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Process Logout
* *************************************** */
accountController.accountLogout = async function (req, res) {
  res.clearCookie("jwt")
  res.redirect("/")
}
module.exports = accountController