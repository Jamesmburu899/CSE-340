const utilities = require("../utilities/")
const db = require("../database/index")

const baseController = {}

baseController.buildHome = async function(req, res){
  try {
    const nav = await utilities.getNav()
    
    // Create a simple home content if the buildHomePage function doesn't exist
    let homeContent = ""
    if (typeof utilities.buildHomePage === 'function') {
      homeContent = await utilities.buildHomePage()
    }
    
    res.render("index", {
      title: "Home",
      nav,
      homeContent
    })
  } catch (error) {
    console.error("Error building home page:", error)
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error building home page",
      nav: ""
    })
  }
}

// Add new function for custom page
baseController.buildCustomPage = async function(req, res){
  try {
    const nav = await utilities.getNav()
    res.render("custom", {
      title: "Vehicle Customs & Personalization",
      nav
    })
  } catch (error) {
    console.error("Error building custom page:", error)
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error building custom page",
      nav: ""
    })
  }
}

module.exports = baseController