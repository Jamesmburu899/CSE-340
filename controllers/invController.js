const invModel = require("../database/index")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getVehiclesByClassification(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getVehicleById(inv_id)
  const vehicleDetail = await utilities.buildVehicleDetail(data)
  let nav = await utilities.getNav()
  const make = data.inv_make
  const model = data.inv_model
  res.render("./inventory/detail", {
    title: make + " " + model,
    nav,
    vehicleDetail,
  })
}

module.exports = invCont