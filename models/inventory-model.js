const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  try {
    // Make sure pool is properly imported and has a query method
    if (!pool || typeof pool.query !== 'function') {
      console.error("Database pool is not properly configured")
      return null
    }
    
    const data = await pool.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    )
    return data.rows
  } catch (error) {
    console.error("getClassifications error", error.message)
    return null
  }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getVehiclesByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getVehiclesByClassification error", error.message)
    return null
  }
}

/* ***************************
 *  Get vehicle by inventory_id
 * ************************** */
async function getVehicleById(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [inventory_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error", error.message)
    return null
  }
}

// Make sure to export getClassifications
module.exports = { getClassifications, getVehiclesByClassificationId, getVehicleById }