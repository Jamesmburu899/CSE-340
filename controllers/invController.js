const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

// Corrected function definitions
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

invCont.testConnection = async function (req, res, next) {
  try {
    const result = await invModel.testConnection()
    res.send(`Database connection successful: ${result.rows[0].now}`)
  } catch (error) {
    console.error("Database connection error:", error)
    res.status(500).send("Database connection failed")
  }
}

invCont.buildManagement = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    messages: req.flash()
  })
}

invCont.buildAddClassification = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    messages: req.flash(),
    classification_name: req.body.classification_name
  })
}

invCont.addClassification = async function(req, res, next) {
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
} // Removed the trailing comma here

invCont.addInventory = async function(req, res, next) {
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

invCont.buildEditClassification = async function(req, res, next) {
  const classification_id = req.params.classification_id
  try {
    const classification = await invModel.getClassificationById(classification_id)
    let nav = await utilities.getNav()
    res.render("./inventory/edit-classification", {
      title: "Edit Classification",
      nav,
      classification,
      messages: req.flash()
    })
  } catch (error) {
    req.flash('messages', [{
      type: 'error',
      text: 'Failed to load classification for editing.'
    }])
    res.redirect('/inv')
  }
}

invCont.updateClassification = async function(req, res, next) {
  const { classification_id, classification_name } = req.body
  try {
    await invModel.updateClassification(classification_id, classification_name)
    req.flash('messages', [{
      type: 'success',
      text: 'Classification updated successfully!'
    }])
    res.redirect('/inv')
  } catch (error) {
    req.flash('messages', [{
      type: 'error',
      text: 'Failed to update classification. Please try again.'
    }])
    res.redirect(`/inv/edit-classification/${classification_id}`)
  }
}

invCont.deleteClassification = async function(req, res, next) {
  const classification_id = req.params.classification_id
  try {
    await invModel.deleteClassification(classification_id)
    req.flash('messages', [{
      type: 'success',
      text: 'Classification deleted successfully!'
    }])
    res.redirect('/inv')
  } catch (error) {
    req.flash('messages', [{
      type: 'error',
      text: 'Failed to delete classification. Please try again.'
    }])
    res.redirect('/inv')
  }
}

invCont.buildEditInventory = async function(req, res, next) {
  const inv_id = req.params.inv_id
  try {
    const vehicle = await invModel.getInventoryByInventoryId(inv_id)
    const classifications = await invModel.getClassifications()
    let nav = await utilities.getNav()
    res.render("./inventory/edit-inventory", {
      title: "Edit " + vehicle.inv_make + " " + vehicle.inv_model,
      nav,
      vehicle,
      classifications,
      messages: req.flash()
    })
  } catch (error) {
    req.flash('messages', [{
      type: 'error',
      text: 'Failed to load vehicle for editing.'
    }])
    res.redirect('/inv')
  }
}

invCont.updateInventory = async function(req, res, next) {
  try {
    await invModel.updateInventory(req.body)
    req.flash('messages', [{
      type: 'success',
      text: 'Vehicle updated successfully!'
    }])
    res.redirect('/inv')
  } catch (error) {
    req.flash('messages', [{
      type: 'error',
      text: 'Failed to update vehicle. Please try again.'
    }])
    res.redirect(`/inv/edit-inventory/${req.body.inv_id}`)
  }
}

invCont.deleteInventory = async function(req, res, next) {
  const inv_id = req.params.inv_id
  try {
    await invModel.deleteInventory(inv_id)
    req.flash('messages', [{
      type: 'success',
      text: 'Vehicle deleted successfully!'
    }])
    res.redirect('/inv')
  } catch (error) {
    req.flash('messages', [{
      type: 'error',
      text: 'Failed to delete vehicle. Please try again.'
    }])
    res.redirect('/inv')
  }
}

module.exports = invCont