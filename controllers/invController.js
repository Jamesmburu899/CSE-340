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
    try {
      await invModel.addClassification(classification_name)
      req.flash('messages', [{
        type: 'success',
        text: 'Classification added successfully!'
      }])
      res.redirect('/inv')
    } catch (error) {
      req.flash('messages', [{
        type: 'error',
        text: 'Failed to add classification. Please try again.'
      }])
      res.redirect('/inv/add-classification')
    }
  },

  addInventory: async function(req, res, next) {
    try {
      await invModel.addInventory(req.body)
      req.flash('messages', [{
        type: 'success',
        text: 'Vehicle added successfully!'
      }])
      res.redirect('/inv')
    } catch (error) {
      req.flash('messages', [{
        type: 'error',
        text: 'Failed to add vehicle. Please try again.'
      }])
      res.redirect('/inv/add-inventory')
    }
  }
}

module.exports = invCont