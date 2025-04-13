const db = require("../database/index")

const utilities = {}

/* ************************
 * Constructs the nav HTML
 ************************** */
utilities.getNav = async function () {
  let data = await db.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.forEach(row => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_name +
      '" title="See our ' +
      row.classification_name +
      ' inventory">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
utilities.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="/inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors"></a>'
      grid += '<div class="namePrice">'
      grid += '<hr>'
      grid += '<h2>'
      grid += '<a href="/inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the vehicle detail view HTML
* ************************************ */
utilities.buildVehicleDetail = async function(vehicle){
  let detail = '<div class="vehicle-detail">'
  detail += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
  detail += '<div class="vehicle-info">'
  detail += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' Details</h2>'
  detail += '<p><strong>Price:</strong> $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>'
  detail += '<p><strong>Description:</strong> ' + vehicle.inv_description + '</p>'
  detail += '<p><strong>Color:</strong> ' + vehicle.inv_color + '</p>'
  detail += '<p><strong>Miles:</strong> ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
  detail += '<p><strong>Year:</strong> ' + vehicle.inv_year + '</p>'
  detail += '</div>'
  detail += '</div>'
  return detail
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
utilities.checkLogin = (req, res, next) => {
  if (req.cookies.jwt) {
    // User is logged in
    next()
  } else {
    // User is not logged in
    return res.redirect("/account/login")
  }
}

module.exports = utilities