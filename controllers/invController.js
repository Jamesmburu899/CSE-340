const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {
  buildByClassification = async function (req, res, next) {
    const classificationId = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classificationId)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    res.render("./inventory/classification", {
      title: data[0].classification_name + " vehicles",
      nav,
      grid,
    })
  }

  buildByInventoryId = async function (req, res, next) {
    const invId = req.params.invId
    const vehicle = await invModel.getInventoryByInventoryId(invId)
    let nav = await utilities.getNav()
    res.render("./inventory/detail", {
      title: vehicle.inv_make + " " + vehicle.inv_model,
      nav,
      vehicle,
    })
  }

  triggerError = function (req, res, next) {
    throw new Error("Intentional Error")
  }

  testConnection = async function (req, res, next) {
    try {
      const result = await invModel.testConnection()
      res.send(`Database connection successful: ${result.rows[0].now}`)
    } catch (error) {
      console.error("Database connection error:", error)
      res.status(500).send("Database connection failed")
    }
  }

  buildManagement: async function(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash()
    })
  }

  buildAddClassification: async function(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      title: "Add Classification",
      nav,
      messages: req.flash(),
      classification_name: req.body.classification_name
    })
  }

  addClassification: async function(req, res, next) {
    const { classification_name } = req.body
    // Add validation and database insertion logic
  }

  buildAddInventory: async function(req, res, next) {
    let nav = await utilities.getNav()
    const classifications = await invModel.getClassifications()
    res.render("./inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      messages: req.flash(),
      classifications,
      ...req.body
    })
  }

  addInventory: async function(req, res, next) {
    // Add validation and database insertion logic
  }
}

module.exports = invCont