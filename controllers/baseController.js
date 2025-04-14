const utilities = require("../utilities/")
const db = require("../database/")

const baseController = {}

baseController.buildHome = async function(req, res){
  try {
    const nav = await utilities.getNav()
    
    // Create a simple home content if the buildHomePage function doesn't exist
    let homeContent = ""
    if (typeof utilities.buildHomeContent === 'function') {
      homeContent = await utilities.buildHomeContent()
    }
    
    res.render("index", {
      title: "Home",
      nav,
      homeContent,
      errors: null,
    })
  } catch (error) {
    console.error("Error building home page:", error)
    const nav = '<ul class="nav-list"><li><a href="/">Home</a></li></ul>'
    res.render("index", {
      title: "Home",
      nav,
      homeContent: "<p>Welcome to CSE Motors</p>",
      errors: [{ msg: "There was an error loading the home page. Please try again later." }],
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

// Add login view function
baseController.buildLogin = async function(req, res){
  try {
    const nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors: null
    })
  } catch (error) {
    console.error("Error building login page:", error)
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error building login page",
      nav: ""
    })
  }
}

// Add registration view function
baseController.buildRegister = async function(req, res){
  try {
    const nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null
    })
  } catch (error) {
    console.error("Error building registration page:", error)
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error building registration page",
      nav: ""
    })
  }
}

// Add account management view function
baseController.buildAccountManagement = async function(req, res){
  try {
    const nav = await utilities.getNav()
    res.render("account/management", {
      title: "Account Management",
      nav,
      errors: null
    })
  } catch (error) {
    console.error("Error building account management page:", error)
    res.status(500).render("errors/error", {
      title: "Server Error",
      message: "Error building account management page",
      nav: ""
    })
  }
}

module.exports = baseController