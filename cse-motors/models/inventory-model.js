const pool = require('../database/connection');

/* ***************************
 * Get vehicle details by ID using prepared statement
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      'SELECT * FROM public.inventory WHERE inv_id = $1',
      [inv_id]
    );
    return data.rows[0];
  } catch (error) {
    console.error('getInventoryById error: ' + error);
    return null;
  }
}

module.exports = { getInventoryById };