const utilities = require("../utilities/")
const db = require("../database/index")

const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  const homeContent = await utilities.buildHomePage()
  res.render("index", {
    title: "Home",
    nav,
    homeContent
  })
}

module.exports = baseController