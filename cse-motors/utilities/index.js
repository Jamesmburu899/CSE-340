const pool = require('../database/connection');

const utilities = {};

/* ***************************
 * Get navigation menu
 * ************************** */
utilities.getNav = async function() {
  try {
    const data = await pool.query(
      'SELECT * FROM public.classification ORDER BY classification_name'
    );
    return data.rows;
  } catch (error) {
    console.error('getNav error: ' + error);
    return null;
  }
}

/* ***************************
 * Build vehicle detail HTML
 * ************************** */
utilities.buildVehicleDetail = async function(data) {
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
        <div class="features">
          <h3>Features</h3>
          <ul>
            <li><i class="fas fa-check"></i> 3 Cup holders</li>
            <li><i class="fas fa-check"></i> Superman doors</li>
            <li><i class="fas fa-check"></i> Fuzzy dice!</li>
          </ul>
        </div>
        <button class="btn btn-primary">Own Today</button>
      </div>
    </div>

    <section class="reviews-section">
      <h2>DMC Delorean Reviews</h2>
      <ul class="reviews-list">
        <li>"So fast it's almost like traveling in time." (4/5)</li>
        <li>"Coolest ride on the road." (5/5)</li>
        <li>"I'm feeling McFly!" (5/5)</li>
        <li>"The most futuristic ride of our day." (4.5/5)</li>
        <li>"80's livin' and I love it!" (5/5)</li>
      </ul>
    </section>

    <section class="upgrades-section">
      <h2>Delorean Upgrades</h2>
      <div class="upgrades-grid">
        <div class="upgrade-item">
          <img src="/images/flux-capacitor.jpg" alt="Flux Capacitor">
          <p>Flux Capacitor</p>
        </div>
        <div class="upgrade-item">
          <img src="/images/flame-decals.jpg" alt="Flame Decals">
          <p>Flame Decals</p>
        </div>
        <div class="upgrade-item">
          <img src="/images/bumper-stickers.jpg" alt="Bumper Stickers">
          <p>Bumper Stickers</p>
        </div>
        <div class="upgrade-item">
          <img src="/images/hub-caps.jpg" alt="Hub Caps">
          <p>Hub Caps</p>
        </div>
      </div>
    </section>
  `;
};

module.exports = utilities;