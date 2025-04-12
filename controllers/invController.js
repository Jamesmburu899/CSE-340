const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

invCont.buildByClassification = async function (req, res, next) {
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

invCont.buildByInventoryId = async function (req, res, next) {
  const invId = req.params.invId
  const vehicle = await invModel.getInventoryByInventoryId(invId)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: vehicle.inv_make + " " + vehicle.inv_model,
    nav,
    vehicle,
  })
}

invCont.triggerError = function (req, res, next) {
  throw new Error("Intentional Error")
}

module.exports = invCont