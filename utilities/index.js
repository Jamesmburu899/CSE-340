// Update this line to import the inventory model
const invModel = require("../models/inventory-model")
// Remove this line if it's causing confusion
// const db = require("../database/index")

const utilities = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
// Update the getNav function to use the correct paths for Sedan, SUV, and Truck
utilities.getNav = async function (req, res, next) {
  try {
    const data = await invModel.getClassifications()
    
    if (!data || !Array.isArray(data)) {
      console.log("No classification data returned from database")
      return '<ul class="nav-list"><li><a href="/">Home</a></li></ul>'
    }
    
    let list = '<ul class="nav-list">'
    list += '<li><a href="/" title="Home page">Home</a></li>'
    
    // Add direct links to Sedan, SUV, and Truck pages with correct paths
    // Make sure the links in your getNav function are correct
    list += '<li><a href="/inv/sedan" title="View our Sedan inventory">Sedans</a></li>'
    list += '<li><a href="/inv/suv" title="View our SUV inventory">SUVs</a></li>'
    list += '<li><a href="/inv/truck" title="View our Truck inventory">Trucks</a></li>'
    
    // Add the rest of the classifications
    data.forEach(row => {
      if (row.classification_name !== 'Sedan' && 
          row.classification_name !== 'SUV' && 
          row.classification_name !== 'Truck') {
        list += '<li>'
        list +=
          '<a href="/inv/type/' +
          row.classification_id +
          '" title="See our inventory of ' +
          row.classification_name +
          ' vehicles">' +
          row.classification_name +
          '</a>'
        list += '</li>'
      }
    })
    list += '</ul>'
    return list
  } catch (error) {
    console.error("getNav error:", error.message)
    return '<ul class="nav-list"><li><a href="/">Home</a></li></ul>'
  }
}

// Remove this function if it exists in your utilities file since we're now using the model
// utilities.getClassifications = async function() { ... }

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
  // Replace Honda Accord image with sedan3.jpg
  const imageSource = (vehicle.inv_make === 'Honda' && vehicle.inv_model === 'Accord') ? '/images/sedan3.jpg' : vehicle.inv_image
  detail += '<img src="' + imageSource + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
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
* Build the home page content with promotions and search options
* ************************************ */
utilities.buildHomeContent = async function() {
  let homeContent = '<div class="home-container">';
  
  // Right Promotion section
  homeContent += '<section class="promotion-section">';
  homeContent += '<h2>Right Promotion</h2>';
  homeContent += '<p>Check out our latest deals on premium vehicles</p>';
  homeContent += '<div class="promotion-banner">';
  homeContent += '<img src="/images/vehicles/promotion-banner.jpg" alt="Premium vehicle deals">';
  homeContent += '</div>';
  homeContent += '</section>';
  
  // Search sections container
  homeContent += '<div class="search-container">';
  
  // Search By Make
  homeContent += '<section class="search-section make-section">';
  homeContent += '<h2>Search By Make</h2>';
  homeContent += '<ul class="make-list">';
  
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
  ];
  
  makes.forEach(make => {
    homeContent += `<li><a href="/inv/make/${make.name.toLowerCase()}">${make.name} (${make.count.toLocaleString()})</a></li>`;
  });
  
  homeContent += '<li><a href="/inv/makes">More Makes</a></li>';
  homeContent += '</ul>';
  homeContent += '</section>';
  
  // Search By Inventory Location
  homeContent += '<section class="search-section location-section">';
  homeContent += '<h2>Search By Inventory Location</h2>';
  homeContent += '<ul class="location-list">';
  homeContent += '<li><a href="/inv/location/japan">Japan Inventory (174,260)</a></li>';
  homeContent += '<li><a href="/inv/location/korea">Korea Inventory (65,534)</a></li>';
  homeContent += '<li><a href="/inv/location/singapore">Singapore Inventory (1,342)</a></li>';
  homeContent += '<li><a href="/inv/location/thailand">Thailand Inventory (6,120)</a></li>';
  homeContent += '<li><a href="/inv/location/china">China Inventory (343)</a></li>';
  homeContent += '<li><a href="/inv/location/uk">UK Inventory (6,002)</a></li>';
  homeContent += '<li><a href="/inv/location/uae">UAE Inventory (3,374)</a></li>';
  homeContent += '</ul>';
  homeContent += '</section>';
  
  // Search By Price
  homeContent += '<section class="search-section price-section">';
  homeContent += '<h2>Search By Price</h2>';
  homeContent += '<ul class="price-list">';
  homeContent += '<li><a href="/inv/price/500">Under USD 500</a></li>';
  homeContent += '<li><a href="/inv/price/1000">Under USD 1,000</a></li>';
  homeContent += '<li><a href="/inv/price/2000">Under USD 2,000</a></li>';
  homeContent += '<li><a href="/inv/price/3000">Under USD 3,000</a></li>';
  homeContent += '<li><a href="/inv/price/4000">Under USD 4,000</a></li>';
  homeContent += '<li><a href="/inv/price/5000">Under USD 5,000</a></li>';
  homeContent += '<li><a href="/inv/price/5001">Over USD 5,000</a></li>';
  homeContent += '</ul>';
  homeContent += '</section>';
  
  // Search By Type
  homeContent += '<section class="search-section type-section">';
  homeContent += '<h2>Search By Type</h2>';
  homeContent += '<ul class="type-list">';
  homeContent += '<li><a href="/inv/type/sedan">Sedan (45,376)</a></li>';
  homeContent += '<li><a href="/inv/type/coupe">Coupe (7,008)</a></li>';
  homeContent += '<li><a href="/inv/type/hatchback">Hatchback (50,364)</a></li>';
  homeContent += '<li><a href="/inv/type/station-wagon">Station Wagon (8,005)</a></li>';
  homeContent += '<li><a href="/inv/type/suv">SUV (65,055)</a></li>';
  homeContent += '<li><a href="/inv/type/pickup">Pick up (6,966)</a></li>';
  homeContent += '<li><a href="/inv/type/van">Van (14,068)</a></li>';
  homeContent += '<li><a href="/inv/type/minivan">Mini Van (26,472)</a></li>';
  homeContent += '<li><a href="/inv/type/wagon">Wagon (18,570)</a></li>';
  homeContent += '<li><a href="/inv/type/convertible">Convertible (3,513)</a></li>';
  homeContent += '<li><a href="/inv/type/bus">Bus (151)</a></li>';
  homeContent += '<li><a href="/inv/type/truck">Truck (11,154)</a></li>';
  homeContent += '<li><a href="/inv/type/heavy-equipment">Heavy Equipment (4)</a></li>';
  homeContent += '</ul>';
  homeContent += '</section>';
  
  // Search By Category
  homeContent += '<section class="search-section category-section">';
  homeContent += '<h2>Search By Category</h2>';
  homeContent += '<ul class="category-list">';
  homeContent += '<li><a href="/inv/category/left-hand-drive">Left Hand Drive (70,685)</a></li>';
  homeContent += '<li><a href="/inv/category/manual">Manual (22,702)</a></li>';
  homeContent += '<li><a href="/inv/category/hybrid">Hybrid (38,229)</a></li>';
  homeContent += '<li><a href="/inv/category/electric">Electric (1,053)</a></li>';
  homeContent += '<li><a href="/inv/category/diesel">Diesel (46,808)</a></li>';
  homeContent += '<li><a href="/inv/category/4wd">4WD (69,695)</a></li>';
  homeContent += '<li><a href="/inv/category/leather-seats">Leather Seats (91,773)</a></li>';
  homeContent += '<li><a href="/inv/category/sun-roof">Sun Roof (38,787)</a></li>';
  homeContent += '</ul>';
  homeContent += '</section>';
  
  homeContent += '</div>'; // End search-container
  
  // Search form
  homeContent += '<section class="search-form-section">';
  homeContent += '<h2>Search Cars</h2>';
  homeContent += '<form action="/inv/search" method="get" class="search-form">';
  
  homeContent += '<div class="form-group">';
  homeContent += '<label for="make">Make:</label>';
  homeContent += '<input type="text" id="make" name="make">';
  homeContent += '</div>';
  
  homeContent += '<div class="form-group">';
  homeContent += '<label for="model">Model:</label>';
  homeContent += '<input type="text" id="model" name="model">';
  homeContent += '</div>';
  
  homeContent += '<div class="form-group">';
  homeContent += '<label for="body-type">Body Type:</label>';
  homeContent += '<select id="body-type" name="body_type">';
  homeContent += '<option value="">Any</option>';
  homeContent += '<option value="Sedan">Sedan</option>';
  homeContent += '<option value="SUV">SUV</option>';
  homeContent += '<option value="Truck">Truck</option>';
  homeContent += '<option value="Coupe">Coupe</option>';
  homeContent += '</select>';
  homeContent += '</div>';
  
  homeContent += '<div class="form-group">';
  homeContent += '<label for="drive">RHD/LHD:</label>';
  homeContent += '<select id="drive" name="drive">';
  homeContent += '<option value="">Any</option>';
  homeContent += '<option value="rhd">Right Hand Drive</option>';
  homeContent += '<option value="lhd">Left Hand Drive</option>';
  homeContent += '</select>';
  homeContent += '</div>';
  
  homeContent += '<div class="form-group">';
  homeContent += '<label for="year">Year:</label>';
  homeContent += '<input type="number" id="year" name="year" placeholder="Enter year">';
  homeContent += '</div>';
  
  homeContent += '<div class="form-group">';
  homeContent += '<label for="keywords">Stock Id or Keywords:</label>';
  homeContent += '<input type="text" id="keywords" name="keywords">';
  homeContent += '</div>';
  
  homeContent += '<button type="submit" class="search-button">Search Cars</button>';
  homeContent += '</form>';
  homeContent += '</section>';
  
  // Important notices
  homeContent += '<section class="notices-section">';
  homeContent += '<h2>Important Notice:</h2>';
  homeContent += '<ul class="notices-list">';
  homeContent += '<li>Beware of fraudulent websites pretending to be SBT. <a href="/notices/fraud">See Details</a></li>';
  homeContent += '<li>Beware of Scams Advising Fake Money Transfer Instructions! <a href="/notices/scams">See Details</a></li>';
  homeContent += '<li>Resale notice to customers with credit transactions <a href="/notices/resale">See Details</a></li>';
  homeContent += '<li>Beware of Websites, SNS, E-Mails and Invoices impersonating SBT <a href="/notices/impersonation">See Details</a></li>';
  homeContent += '</ul>';
  homeContent += '</section>';
  
  // Popular SUVs
  homeContent += '<section class="popular-suvs-section">';
  homeContent += '<h2>Most Popular SUVs in Kenya</h2>';
  homeContent += '<div class="suv-grid">';
  
  const popularSUVs = [
    { name: 'TOYOTA LAND CRUISER PRADO', price: 16130, image: '/images/vehicles/prado.jpg' },
    { name: 'SUBARU FORESTER', price: 4400, image: '/images/vehicles/forester.jpg' },
    { name: 'TOYOTA HARRIER', price: 8730, image: '/images/vehicles/harrier.jpg' },
    { name: 'MAZDA CX5', price: 3670, image: '/images/vehicles/cx5.jpg' },
    { name: 'NISSAN XTRAIL', price: 2500, image: '/images/vehicles/xtrail.jpg' },
    { name: 'HONDA CRV', price: 5500, image: '/images/vehicles/crv.jpg' },
    { name: 'TOYOTA VANGUARD', price: 6090, image: '/images/vehicles/vanguard.jpg' },
    { name: 'TOYOTA RAV4', price: 5810, image: '/images/vehicles/rav4.jpg' }
  ];
  
  popularSUVs.forEach(suv => {
    homeContent += '<div class="suv-card">';
    homeContent += `<h3>${suv.name}</h3>`;
    homeContent += `<img src="${suv.image}" alt="${suv.name}">`;
    homeContent += `<p class="price">USD ${suv.price}~</p>`;
    homeContent += '<a href="#" class="see-more-btn">See More</a>';
    homeContent += '</div>';
  });
  
  homeContent += '</div>';
  homeContent += '</section>';
  
  homeContent += '</div>'; // End home-container
  
  return homeContent;
}

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

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
utilities.handleErrors = fn => {
  return async (req, res, next) => {
    try {
      if (typeof fn !== 'function') {
        throw new Error('Handler must be a function');
      }
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = utilities