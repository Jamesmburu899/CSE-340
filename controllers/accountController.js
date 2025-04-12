const accountModel = require("../models/account-model")
const utilities = require("../utilities/")
const bcrypt = require("bcryptjs")

const accountController = {}

// ... existing methods ...

accountController.buildAccountManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/management", {
    title: "Account Management",
    nav,
    errors: null,
  })
}

accountController.buildAccountUpdate = async function (req, res, next) {
  let nav = await utilities.getNav()
  const accountId = req.params.accountId
  const accountData = await accountModel.getAccountById(accountId)
  res.render("./account/update", {
    title: "Update Account",
    nav,
    errors: null,
    accountData,
  })
}

accountController.updateAccount = async function (req, res, next) {
  const { account_id, account_firstname, account_lastname, account_email } = req.body
  const accountData = await accountModel.getAccountById(account_id)
  
  try {
    const result = await accountModel.updateAccount(
      account_id,
      account_firstname,
      account_lastname,
      account_email
    )
    if (result) {
      req.flash("notice", "Account updated successfully.")
      res.redirect("/account/")
    } else {
      req.flash("notice", "Update failed.")
      res.redirect("/account/update/" + account_id)
    }
  } catch (error) {
    req.flash("notice", "Update failed.")
    res.redirect("/account/update/" + account_id)
  }
}

accountController.updatePassword = async function (req, res, next) {
  const { account_id, account_password } = req.body
  
  try {
    const hashedPassword = await bcrypt.hashSync(account_password, 10)
    const result = await accountModel.updatePassword(account_id, hashedPassword)
    if (result) {
      req.flash("notice", "Password updated successfully.")
      res.redirect("/account/")
    } else {
      req.flash("notice", "Password update failed.")
      res.redirect("/account/update/" + account_id)
    }
  } catch (error) {
    req.flash("notice", "Password update failed.")
    res.redirect("/account/update/" + account_id)
  }
}

module.exports = accountController