const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
  let data = [
    { text: "Home", link: "/" },
    { text: "Custom", link: "/custom" },
    { text: "Sedan", link: "/sedan" },
    { text: "SUV", link: "/suv" },
    { text: "Truck", link: "/truck" }
  ]
  let list = "<ul>"
  data.forEach(item => {
    list += "<li>"
    list += `<a href="${item.link}">${item.text}</a>`
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* ************************
 * Build the vehicle detail view HTML
 ************************** */
Util.buildVehicleDetail = async function(vehicle){
  let price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(vehicle.inv_price)

  let miles = new Intl.NumberFormat('en-US').format(vehicle.inv_miles)

  let html = `<div class="vehicle-container">
    <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-image">
    <div class="vehicle-info">
      <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
      <p class="vehicle-price">${price}</p>
      <dl class="vehicle-details">
        <dt>Year:</dt>
        <dd>${vehicle.inv_year}</dd>
        <dt>Mileage:</dt>
        <dd>${miles} miles</dd>
        <dt>Color:</dt>
        <dd>${vehicle.inv_color}</dd>
        <dt>Description:</dt>
        <dd>${vehicle.inv_description}</dd>
      </dl>
    </div>
  </div>`
  return html
}

Util.buildClassificationGrid = async function(data) {
  let grid = '<ul class="inv-display">'
  data.forEach(vehicle => {
    grid += '<li>'
    grid += '<a href="../../inv/detail/' + vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model 
      + ' on CSE Motors"></a>'
    grid += '<div class="namePrice">'
    grid += '<hr>'
    grid += '<h2>'
    grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
    grid += '</h2>'
    grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
    grid += '</div>'
    grid += '</li>'
  })
  grid += '</ul>'
  return grid
}

Util.handleErrors = async function(err, req, res, next) {
  let nav = await Util.getNav()
  let title = err.status || 'Server Error'
  let message = err.message || 'Oh no! There was a crash. Maybe try a different route?'
  
  if (err.status === 404) {
    message = 'Sorry, we appear to have lost that page.'
  }
  
  res.render("errors/error", {
    title,
    message,
    nav
  })
}

module.exports = Util