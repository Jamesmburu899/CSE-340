const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build Sedan View
 * ************************** */
invCont.buildSedanView = async function (req, res, next) {
  try {
    const data = await invModel.getVehiclesByClassificationId(1)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    
    res.render("inventory/sedan", {
      title: "Sedan vehicles",
      nav,
      grid,
      errors: null,
    })
  } catch (error) {
    console.error("buildSedanView error:", error)
    const nav = await utilities.getNav()
    res.render("inventory/sedan", {
      title: "Sedan vehicles",
      nav,
      message: "An error occurred retrieving the vehicles.",
      errors: null,
    })
  }
}

/* ***************************
 *  Build SUV View
 * ************************** */
invCont.buildSUVView = async function (req, res, next) {
  try {
    const data = await invModel.getVehiclesByClassificationId(2)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    
    res.render("inventory/suv", {
      title: "SUV vehicles",
      nav,
      grid,
      errors: null,
    })
  } catch (error) {
    console.error("buildSUVView error:", error)
    const nav = await utilities.getNav()
    res.render("inventory/suv", {
      title: "SUV vehicles",
      nav,
      message: "An error occurred retrieving the vehicles.",
      errors: null,
    })
  }
}

/* ***************************
 *  Build Truck View
 * ************************** */
invCont.buildTruckView = async function (req, res, next) {
  try {
    const data = await invModel.getVehiclesByClassificationId(3)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    
    res.render("inventory/truck", {
      title: "Truck vehicles",
      nav,
      grid,
      errors: null,
    })
  } catch (error) {
    console.error("buildTruckView error:", error)
    const nav = await utilities.getNav()
    res.render("inventory/truck", {
      title: "Truck vehicles",
      nav,
      message: "An error occurred retrieving the vehicles.",
      errors: null,
    })
  }
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    
    // Get filter parameters from query string
    const filters = {
      price: req.query.price || null,
      year: req.query.year || null,
      make: req.query.make || null
    }
    
    // Get data with filters applied
    const data = await invModel.getVehiclesByClassificationId(classification_id, filters)
    
    if (!data || data.length === 0) {
      const nav = await utilities.getNav()
      
      // Determine which template to use based on classification_id
      let viewTemplate = "inventory/classification"
      let className = "Unknown"
      
      if (classification_id == 1) {
        viewTemplate = "inventory/sedan"
        className = "Sedan"
      } else if (classification_id == 2) {
        viewTemplate = "inventory/suv"
        className = "SUV"
      } else if (classification_id == 3) {
        viewTemplate = "inventory/truck"
        className = "Truck"
      }
      
      return res.render(viewTemplate, {
        title: className + " vehicles",
        nav,
        message: "No vehicles found matching your criteria.",
        errors: null,
      })
    }
    
    const grid = await utilities.buildClassificationGrid(data)
    const className = data[0].classification_name
    const nav = await utilities.getNav()
    
    // Determine which template to use based on classification_id
    let viewTemplate = "inventory/classification"
    
    if (classification_id == 1) {
      viewTemplate = "inventory/sedan"
    } else if (classification_id == 2) {
      viewTemplate = "inventory/suv"
    } else if (classification_id == 3) {
      viewTemplate = "inventory/truck"
    }
    
    res.render(viewTemplate, {
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

/* ***************************
 *  Build Sedan view
 * ************************** */
invCont.buildSedanView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    const data = await invModel.getVehiclesByClassificationId(1)
    const grid = await utilities.buildClassificationGrid(data)
    res.render("inventory/sedan", {
      title: "Sedan Vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

invCont.buildSUVView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    const data = await invModel.getVehiclesByClassificationId(2)
    const grid = await utilities.buildClassificationGrid(data)
    res.render("inventory/suv", {
      title: "SUV Vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

invCont.buildTruckView = async function (req, res, next) {
  try {
    const nav = await utilities.getNav()
    const data = await invModel.getVehiclesByClassificationId(3)
    const grid = await utilities.buildClassificationGrid(data)
    res.render("inventory/truck", {
      title: "Truck Vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont