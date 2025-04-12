const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const utilities = require("./utilities/")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const session = require("express-session")
const pool = require('./database/')
const cookieParser = require("cookie-parser")

/* ***********************
 * Middleware
 *************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'sessionId'
}))

app.use(cookieParser())
app.use(utilities.checkJWTToken)

// Message Middleware
app.use(utilities.message)

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ***********************
 * Routes
 *************************/
app.use(static)
app.use("/inv", inventoryRoute)
app.use("/account", accountRoute)

app.get("/", utilities.handleErrors(baseController.buildHome))

// Error handling middleware
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  
  if(err.status === 404){ 
    res.status(404)
    message = err.message
  } else {
    res.status(err.status || 500)
    message = err.message || 'Oh no! There was a crash. Maybe try a different route?'
  }
  
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT
const host = process.env.HOST

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

// Add this route temporarily to test DB connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.send(`DB Connected. Server time: ${result.rows[0].now}`)
  } catch (error) {
    res.send(`DB Connection failed: ${error.message}`)
  }
})