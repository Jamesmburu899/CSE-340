const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  try {
    // Check if pool is properly configured
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
 *  with optional filtering by price, year, and make
 * ************************** */
async function getVehiclesByClassificationId(classification_id, filters = {}) {
  try {
    console.log(`Fetching vehicles for classification_id: ${classification_id}`);
    let query = `SELECT i.*, c.classification_name FROM public.inventory AS i 
                JOIN public.classification AS c 
                ON i.classification_id = c.classification_id 
                WHERE i.classification_id = $1::integer`;
    
    const queryParams = [classification_id];
    let paramCount = 1;
    
    // Add price range filter
    if (filters.price) {
      paramCount++;
      if (filters.price === 'under20k') {
        query += ` AND i.inv_price < 20000`;
      } else if (filters.price === '20k-25k') {
        query += ` AND i.inv_price >= 20000 AND i.inv_price <= 25000`;
      } else if (filters.price === '25k-30k') {
        query += ` AND i.inv_price >= 25000 AND i.inv_price <= 30000`;
      } else if (filters.price === 'over30k') {
        query += ` AND i.inv_price > 30000`;
      } else if (filters.price === 'under25k') {
        query += ` AND i.inv_price < 25000`;
      } else if (filters.price === '35k-40k') {
        query += ` AND i.inv_price >= 35000 AND i.inv_price <= 40000`;
      } else if (filters.price === 'under35k') {
        query += ` AND i.inv_price < 35000`;
      } else if (filters.price === 'over40k') {
        query += ` AND i.inv_price > 40000`;
      }
    }
    
    // Add year filter
    if (filters.year) {
      paramCount++;
      query += ` AND i.inv_year = $${paramCount}`;
      queryParams.push(filters.year);
    }
    
    // Add make filter
    if (filters.make) {
      paramCount++;
      query += ` AND i.inv_make = $${paramCount}`;
      queryParams.push(filters.make);
    }
    
    // Add sorting
    query += ` ORDER BY i.inv_price`;
    
    const data = await pool.query(query, queryParams);
    console.log(`Found ${data.rows.length} vehicles for classification_id: ${classification_id}`);
    if (!data.rows.length) {
      console.log('No vehicles found for the given classification');
    }
    return data.rows;
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