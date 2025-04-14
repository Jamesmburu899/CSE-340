const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getVehiclesByClassificationId(classification_id)
    
    if (!data || data.length === 0) {
      const nav = await utilities.getNav()
      const className = "Unknown"
      return res.render("inventory/classification", {
        title: className + " vehicles",
        nav,
        message: "No vehicles found for this classification",
        errors: null,
      })
    }
    
    const grid = await utilities.buildClassificationGrid(data)
    const className = data[0].classification_name
    const nav = await utilities.getNav()
    res.render("inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
      errors: null,
    })
  } catch (error) {
    console.error("buildByClassificationId error:", error)
    const nav = await utilities.getNav()
    res.render("inventory/classification", {
      title: "Vehicle Classification",
      nav,
      message: "An error occurred retrieving the vehicles.",
      errors: null,
    })
  }
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
  try {
    const vehicle_id = req.params.vehicleId
    const vehicle = await invModel.getVehicleById(vehicle_id)
    
    if (!vehicle) {
      const nav = await utilities.getNav()
      return res.render("inventory/detail", {
        title: "Vehicle Not Found",
        nav,
        message: "The specified vehicle was not found.",
        errors: null,
      })
    }
    
    const nav = await utilities.getNav()
    res.render("inventory/detail", {
      title: vehicle.inv_make + " " + vehicle.inv_model,
      nav,
      vehicle,
      errors: null,
    })
  } catch (error) {
    console.error("buildVehicleDetail error:", error)
    const nav = await utilities.getNav()
    res.render("inventory/detail", {
      title: "Vehicle Detail",
      nav,
      message: "An error occurred retrieving the vehicle details.",
      errors: null,
    })
  }
}

module.exports = invCont