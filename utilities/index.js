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

/* ****************************************
* Middleware to check JWT token
**************************************** */
utilities.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    // Token exists, proceed to next middleware
    next()
  } else {
    // No token, but that's okay for many routes
    next()
  }
}

/* ****************************************
* Process messages for use in views
**************************************** */
utilities.message = function (req, res, next) {
  const messages = []
  if (req.session.flash) {
    res.locals.messages = req.session.flash
    req.session.flash = {}
  }
  next()
}

/* **************************************
* Build the home page HTML with featured content
* ************************************ */
utilities.buildHomePage = async function() {
  // Monthly campaign section
  let homePage = '<section class="home-hero">'
  homePage += '<div class="campaign-banner">'
  homePage += '<h2>Monthly Campaign</h2>'
  homePage += '<div class="fresh-picks">'
  homePage += '<h3>Fresh Picks</h3>'
  homePage += '<div class="promotion-container">'
  homePage += '<div class="right-promotion">'
  homePage += '<img src="/images/vehicles/promotion-banner.jpg" alt="Special promotion">'
  homePage += '<h4>Right Promotion</h4>'
  homePage += '<p>Check out our latest deals on premium vehicles</p>'
  homePage += '</div>'
  homePage += '</div>'
  homePage += '</div>'
  homePage += '</div>'
  homePage += '</section>'

  // Search by make section
  homePage += '<section class="search-section">'
  homePage += '<div class="search-by-make">'
  homePage += '<h3>Search By Make</h3>'
  homePage += '<ul class="make-list">'
  
  const makes = [
    { name: 'Toyota', count: 64502 },
    { name: 'Honda', count: 19634 },
    { name: 'Nissan', count: 23500 },
    { name: 'Mazda', count: 9397 },
    { name: 'Suzuki', count: 18816 },
    { name: 'Mitsubishi', count: 5529 },
    { name: 'Daihatsu', count: 9664 },
    { name: 'Subaru', count: 8674 },
    { name: 'Hino', count: 350 },
    { name: 'Volkswagen', count: 3336 },
    { name: 'Bmw', count: 8052 },
    { name: 'Isuzu', count: 996 },
    { name: 'Lexus', count: 1877 },
    { name: 'Mercedes', count: 5962 },
    { name: 'Audi', count: 3166 },
    { name: 'Volvo', count: 2611 },
    { name: 'Land Rover', count: 3744 },
    { name: 'Ford', count: 2870 },
    { name: 'Peugeot', count: 1508 },
    { name: 'Jeep', count: 616 },
    { name: 'Citroen', count: 704 },
    { name: 'Jaguar', count: 680 },
    { name: 'Hyundai', count: 13293 },
    { name: 'Kia', count: 21697 }
  ]
  
  makes.forEach(make => {
    homePage += `<li><a href="/inv/make/${make.name}">${make.name} (${make.count.toLocaleString()})</a></li>`
  })
  
  homePage += '<li><a href="/inv/makes">More Makes</a></li>'
  homePage += '</ul>'
  homePage += '</div>'
  
  // Search by categories
  homePage += '<div class="search-categories">'
  
  // Search by inventory location
  homePage += '<div class="search-category">'
  homePage += '<h3>Search By Inventory Location</h3>'
  homePage += '<ul>'
  homePage += '<li>Japan Inventory (174,260)</li>'
  homePage += '<li>Korea Inventory (65,534)</li>'
  homePage += '<li>Singapore Inventory (1,342)</li>'
  homePage += '<li>Thailand Inventory (6,120)</li>'
  homePage += '<li>China Inventory (343)</li>'
  homePage += '<li>UK Inventory (6,002)</li>'
  homePage += '<li>UAE Inventory (3,374)</li>'
  homePage += '</ul>'
  homePage += '</div>'
  
  // Search by price
  homePage += '<div class="search-category">'
  homePage += '<h3>Search By Price</h3>'
  homePage += '<ul>'
  homePage += '<li><a href="/inv/price/500">Under USD 500</a></li>'
  homePage += '<li><a href="/inv/price/1000">Under USD 1,000</a></li>'
  homePage += '<li><a href="/inv/price/2000">Under USD 2,000</a></li>'
  homePage += '<li><a href="/inv/price/3000">Under USD 3,000</a></li>'
  homePage += '<li><a href="/inv/price/4000">Under USD 4,000</a></li>'
  homePage += '<li><a href="/inv/price/5000">Under USD 5,000</a></li>'
  homePage += '<li><a href="/inv/price/5001">Over USD 5,000</a></li>'
  homePage += '</ul>'
  homePage += '</div>'
  
  // Search by type
  homePage += '<div class="search-category">'
  homePage += '<h3>Search By Type</h3>'
  homePage += '<ul>'
  homePage += '<li><a href="/inv/type/Sedan">Sedan (45,376)</a></li>'
  homePage += '<li><a href="/inv/type/Coupe">Coupe (7,008)</a></li>'
  homePage += '<li><a href="/inv/type/Hatchback">Hatchback (50,364)</a></li>'
  homePage += '<li><a href="/inv/type/Station Wagon">Station Wagon (8,005)</a></li>'
  homePage += '<li><a href="/inv/type/SUV">SUV (65,055)</a></li>'
  homePage += '<li><a href="/inv/type/Pick up">Pick up (6,966)</a></li>'
  homePage += '<li><a href="/inv/type/Van">Van (14,068)</a></li>'
  homePage += '<li><a href="/inv/type/Mini Van">Mini Van (26,472)</a></li>'
  homePage += '<li><a href="/inv/type/Wagon">Wagon (18,570)</a></li>'
  homePage += '<li><a href="/inv/type/Convertible">Convertible (3,513)</a></li>'
  homePage += '<li><a href="/inv/type/Bus">Bus (151)</a></li>'
  homePage += '<li><a href="/inv/type/Truck">Truck (11,154)</a></li>'
  homePage += '<li><a href="/inv/type/Heavy Equipment">Heavy Equipment (4)</a></li>'
  homePage += '</ul>'
  homePage += '</div>'
  
  // Search by category
  homePage += '<div class="search-category">'
  homePage += '<h3>Search By Category</h3>'
  homePage += '<ul>'
  homePage += '<li><a href="/inv/category/lhd">Left Hand Drive (70,685)</a></li>'
  homePage += '<li><a href="/inv/category/manual">Manual (22,702)</a></li>'
  homePage += '<li><a href="/inv/category/hybrid">Hybrid (38,229)</a></li>'
  homePage += '<li><a href="/inv/category/electric">Electric (1,053)</a></li>'
  homePage += '<li><a href="/inv/category/diesel">Diesel (46,808)</a></li>'
  homePage += '<li><a href="/inv/category/4wd">4WD (69,695)</a></li>'
  homePage += '<li><a href="/inv/category/leather">Leather Seats (91,773)</a></li>'
  homePage += '<li><a href="/inv/category/sunroof">Sun Roof (38,787)</a></li>'
  homePage += '</ul>'
  homePage += '</div>'
  
  homePage += '</div>' // End search-categories
  homePage += '</section>' // End search-section
  
  // Search form
  homePage += '<section class="search-form">'
  homePage += '<h3>Search Cars</h3>'
  homePage += '<form action="/inv/search" method="get">'
  homePage += '<div class="form-group">'
  homePage += '<label for="make">Make:</label>'
  homePage += '<input type="text" id="make" name="make">'
  homePage += '</div>'
  homePage += '<div class="form-group">'
  homePage += '<label for="model">Model:</label>'
  homePage += '<input type="text" id="model" name="model">'
  homePage += '</div>'
  homePage += '<div class="form-group">'
  homePage += '<label for="body-type">Body Type:</label>'
  homePage += '<select id="body-type" name="body_type">'
  homePage += '<option value="">Any</option>'
  homePage += '<option value="Sedan">Sedan</option>'
  homePage += '<option value="SUV">SUV</option>'
  homePage += '<option value="Truck">Truck</option>'
  homePage += '<option value="Coupe">Coupe</option>'
  homePage += '</select>'
  homePage += '</div>'
  homePage += '<div class="form-group">'
  homePage += '<label for="drive">RHD/LHD:</label>'
  homePage += '<select id="drive" name="drive">'
  homePage += '<option value="">Any</option>'
  homePage += '<option value="rhd">Right Hand Drive</option>'
  homePage += '<option value="lhd">Left Hand Drive</option>'
  homePage += '</select>'
  homePage += '</div>'
  homePage += '<div class="form-group year-range">'
  homePage += '<label>Year:</label>'
  homePage += '<input type="number" name="year_from" placeholder="From">'
  homePage += '<input type="number" name="year_to" placeholder="To">'
  homePage += '</div>'
  homePage += '<div class="form-group">'
  homePage += '<label for="keywords">Stock Id or Keywords:</label>'
  homePage += '<input type="text" id="keywords" name="keywords">'
  homePage += '</div>'
  homePage += '<button type="submit">Search Cars</button>'
  homePage += '</form>'
  homePage += '</section>'
  
  // Important notices
  homePage += '<section class="important-notices">'
  homePage += '<h3>Important Notice:</h3>'
  homePage += '<div class="notice-list">'
  homePage += '<div class="notice">Beware of fraudulent websites pretending to be SBT. <a href="#">See Details</a></div>'
  homePage += '<div class="notice">Beware of Scams Advising Fake Money Transfer Instructions! <a href="#">See Details</a></div>'
  homePage += '<div class="notice">Resale notice to customers with credit transactions <a href="#">See Details</a></div>'
  homePage += '<div class="notice">Beware of Websites, SNS, E-Mails and Invoices impersonating SBT <a href="#">See Details</a></div>'
  homePage += '</div>'
  homePage += '</section>'
  
  // Popular SUVs
  homePage += '<section class="popular-suvs">'
  homePage += '<h2>Most Popular SUVs in Kenya</h2>'
  homePage += '<div class="suv-grid">'
  
  const popularSUVs = [
    { name: 'TOYOTA LAND CRUISER PRADO', price: 16130, image: '/images/vehicles/prado.jpg' },
    { name: 'SUBARU FORESTER', price: 4400, image: '/images/vehicles/forester.jpg' },
    { name: 'TOYOTA HARRIER', price: 8730, image: '/images/vehicles/harrier.jpg' },
    { name: 'MAZDA CX5', price: 3670, image: '/images/vehicles/cx5.jpg' },
    { name: 'NISSAN XTRAIL', price: 2500, image: '/images/vehicles/xtrail.jpg' },
    { name: 'HONDA CRV', price: 5500, image: '/images/vehicles/crv.jpg' },
    { name: 'TOYOTA VANGUARD', price: 6090, image: '/images/vehicles/vanguard.jpg' },
    { name: 'TOYOTA RAV4', price: 5810, image: '/images/vehicles/rav4.jpg' }
  ]
  
  popularSUVs.forEach(suv => {
    homePage += '<div class="suv-card">'
    homePage += `<img src="${suv.image}" alt="${suv.name}">`
    homePage += `<h3>${suv.name}</h3>`
    homePage += `<p>USD ${suv.price}~</p>`
    homePage += '<a href="#">See More</a>'
    homePage += '</div>'
  })
  
  homePage += '</div>'
  homePage += '</section>'
  
  return homePage
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

/* ****************************************
* Middleware to check JWT token
**************************************** */
utilities.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    // Token exists, proceed to next middleware
    next()
  } else {
    // No token, but that's okay for many routes
    next()
  }
}

/* ****************************************
* Process messages for use in views
**************************************** */
utilities.message = function (req, res, next) {
  const messages = []
  if (req.session.flash) {
    res.locals.messages = req.session.flash
    req.session.flash = {}
  }
  next()
}

module.exports = utilities