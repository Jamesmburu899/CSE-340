const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

// Build inventory by classification view
invCont.buildByClassification = async function (req, res, next) {
  try {
    const classificationId = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classificationId)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
      title: className + " Vehicles",
      nav,
      grid,
    })
  } catch (error) {
    error.status = 500
    next(error)
  }
}

// Build inventory detail view
invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inventoryId = req.params.invId
    const vehicle = await invModel.getInventoryByInventoryId(inventoryId)
    
    if (!vehicle) {
      const err = new Error("Vehicle not found")
      err.status = 404
      next(err)
      return
    }
    
    let nav = await utilities.getNav()
    res.render("./inventory/detail", {
      title: vehicle.inv_make + " " + vehicle.inv_model,
      nav,
      vehicle,
    })
  } catch (error) {
    error.status = 500
    next(error)
  }
}

module.exports = invCont