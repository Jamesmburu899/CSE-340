const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("home", {
    title: "Home",
    nav,
    // Remove any search data that might be passed to the template
  })
}

baseController.buildCustomPage = async function(req, res) {
  const nav = await utilities.getNav()
  res.render("custom", {
    title: "Custom & Personalization",
    nav
  })
}

module.exports = baseController