const pool = require('../database/connection'); // Fixed path (should be ../)
const { escape } = require('html-escaper'); // For HTML security

const utilities = {
  /* ***************************
   * Get navigation menu
   * ************************** */
  async getNav() {
    try {
      // Test connection first
      await pool.query('SELECT 1');
      
      const { rows } = await pool.query(
        `SELECT classification_id AS id, 
                classification_name AS name
         FROM public.classification 
         ORDER BY classification_name`
      );
      
      return rows.map(row => ({
        ...row,
        name: escape(row.name) // Escape HTML
      }));
    } catch (error) {
      console.error('getNav error:', error);
      return []; // Return empty array on error
    }
  },

  /* ***************************
   * Build vehicle detail HTML
   * ************************** */
  buildVehicleDetail(data) {
    if (!data) return '<p class="error">No vehicle details available.</p>';

    // Safe data handling with defaults
    const vehicle = {
      year: data.inv_year ? escape(data.inv_year.toString()) : 'N/A',
      make: escape(data.inv_make || 'Unknown'),
      model: escape(data.inv_model || ''),
      price: this.formatCurrency(data.inv_price),
      miles: this.formatNumber(data.inv_miles) + ' miles',
      color: escape(data.inv_color || 'Not specified'),
      description: escape(data.inv_description || 'No description available.'),
      image: data.inv_image || '/images/placeholder.jpg'
    };

    return `
      <div class="vehicle-detail-container">
        <div class="vehicle-image">
          <img src="${vehicle.image}" 
               alt="${vehicle.year} ${vehicle.make} ${vehicle.model}"
               loading="lazy">
        </div>
        <div class="vehicle-info">
          <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
          <div class="price"><strong>Price:</strong> ${vehicle.price}</div>
          <div class="mileage"><strong>Mileage:</strong> ${vehicle.miles}</div>
          <div class="color"><strong>Color:</strong> ${vehicle.color}</div>
          <div class="description">
            <h3>Description</h3>
            <p>${vehicle.description}</p>
          </div>
        </div>
      </div>
    `;
  },

  /* ***************************
   * Helper: Format currency
   * ************************** */
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  },

  /* ***************************
   * Helper: Format numbers
   * ************************** */
  formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num || 0);
  }
};

module.exports = utilities;