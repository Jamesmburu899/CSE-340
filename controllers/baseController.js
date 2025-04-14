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

module.exports = baseController