const utilities = require("../utilities/")
const db = require("../database/index")

const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {
    title: "Home",
    nav
  })
}

module.exports = baseController