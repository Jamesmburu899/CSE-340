const utilities = require("../utilities/")

const errorController = {}

errorController.error404 = async function(req, res, next){
  const nav = await utilities.getNav()
  res.render("errors/error404", {
    title: "404 - Page Not Found",
    nav
  })
}

errorController.error500 = async function(err, req, res, next){
  const nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error500", {
    title: "Server Error",
    nav,
    message: err.message
  })
}

module.exports = errorController