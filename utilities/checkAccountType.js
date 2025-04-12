const checkAccountType = (req, res, next) => {
  const accountType = res.locals.accountData?.account_type
  if (accountType === "Employee" || accountType === "Admin") {
    next()
  } else {
    req.flash("notice", "Please log in with proper account type")
    return res.redirect("/account/login")
  }
}

module.exports = checkAccountType