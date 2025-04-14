const utilities = require("../utilities/")

const errorController = {}

errorController.error404 = async function(req, res, next){
  const nav = await utilities.getNav()
  res.status(404).render("errors/error", {
    title: "404 - Page Not Found",
    message: "Sorry, the page you requested cannot be found.",
    nav
  })
}

errorController.error500 = async function(err, req, res, next){
  const nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: err.message || "Internal Server Error",
    nav
  })
}

errorController.trigger500Error = async function(req, res, next){
  // Intentionally throw an error for testing purposes
  throw new Error("Intentional 500 error triggered for testing")
}

module.exports = errorController