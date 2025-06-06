/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the server and routes.
 ****************************************** */
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const errorController = require("./controllers/errorController")

// Import inventory routes
const inventoryRoute = require("./routes/inventoryRoute")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not required if using layouts/layout.ejs

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route
app.get("/", baseController.buildHome)

// Inventory routes - use the imported route
// Make sure this line is in your server.js file
app.use("/inv", inventoryRoute)

// Error routes
app.use(errorController.error404)
app.use(errorController.error500)

/* ***********************
 * Express Error Handler
 *************************/
app.use(async (err, req, res, next) => {
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ 
    res.render("errors/error404", {
      title: '404 - Page Not Found',
      message: err.message,
      error: err
    })
  } else {
    res.render("errors/error500", {
      title: 'Server Error',
      message: err.message,
      error: err
    })
  }
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000
const host = process.env.HOST || "localhost"

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})