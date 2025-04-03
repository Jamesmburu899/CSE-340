const pool = require('./database/connection'); // ✅ Corrected path

const utilities = {};

/* ***************************
 * Get navigation menu
 * ************************** */
utilities.getNav = async function () {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM public.classification ORDER BY classification_name'
    );
    return rows;
  } catch (error) {
    console.error('getNav error:', error);
    return [];
  }
};

/* ***************************
 * Build vehicle detail HTML
 * ************************** */
utilities.buildVehicleDetail = function (data) {
  if (!data) return '<p>No vehicle details available.</p>';

  return `
    <div class="vehicle-detail-container">
      <div class="vehicle-image">
        <img src="${data.inv_image}" alt="${data.inv_make} ${data.inv_model}">
      </div>
      <div class="vehicle-info">
        <h1>${data.inv_year} ${data.inv_make} ${data.inv_model}</h1>
        <div class="price">Price: $${new Intl.NumberFormat('en-US').format(data.inv_price)}</div>
        <div class="mileage">Mileage: ${new Intl.NumberFormat('en-US').format(data.inv_miles)} miles</div>
        <div class="color">Color: ${data.inv_color}</div>
        <div class="description">
          <h3>Description</h3>
          <p>${data.inv_description}</p>
        </div>
      </div>
    </div>
  `;
};

module.exports = utilities;
