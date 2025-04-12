const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Builds the navigation bar
 ************************** */
Util.getNav = async function () {
  try {
    const classifications = await invModel.getClassifications()
    let nav = '<ul>'
    classifications.forEach(cat => {
      nav += `<li><a href="/inv/type/${cat.classification_id}" 
        title="View our ${cat.classification_name} lineup"
        class="${cat.classification_name.toLowerCase()}">${cat.classification_name}</a></li>`
    })
    nav += '</ul>'
    return nav
  } catch (error) {
    console.error("Nav building error:", error)
    throw error
  }
}

/* ************************
 * Builds the vehicle detail HTML
 ************************** */
Util.buildVehicleDetail = async function(vehicle) {
  try {
    const price = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(vehicle.inv_price)

    const miles = new Intl.NumberFormat('en-US').format(vehicle.inv_miles)

    return `
      <div class="vehicle-detail-wrapper">
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
        <div class="vehicle-info">
          <h2>${vehicle.inv_make} ${vehicle.inv_model} (${vehicle.inv_year})</h2>
          <p class="price">Price: ${price}</p>
          <p class="mileage">Mileage: ${miles}</p>
          <p class="color">Color: ${vehicle.inv_color}</p>
          <p class="description">${vehicle.inv_description}</p>
        </div>
      </div>
    `
  } catch (error) {
    console.error("Vehicle detail building error:", error)
    throw error
  }
}

/* ************************
 * Builds the classification grid view
 ************************** */
Util.buildClassificationGrid = async function(data) {
  let grid = '<ul class="inv-display">'
  data.forEach(vehicle => {
    grid += '<li>'
    grid += '<a href="../../inv/detail/' + vehicle.inv_id + '">'
    grid += '<img src="' + vehicle.inv_thumbnail + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
    grid += '<div class="namePrice">'
    grid += '<hr>'
    grid += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h2>'
    grid += '<span class="price">$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
    grid += '</div>'
    grid += '</a>'
    grid += '</li>'
  })
  grid += '</ul>'
  return grid
}

Util.handleLogout = (req, res, next) => {
  res.clearCookie("jwt")
  res.redirect("/")
}

Util.checkAccountType = (req, res, next) => {
  const accountType = res.locals.accountData?.account_type
  if (accountType === "Employee" || accountType === "Admin") {
    next()
  } else {
    req.flash("notice", "Please log in with proper account type")
    return res.redirect("/account/login")
  }
}

module.exports = Util