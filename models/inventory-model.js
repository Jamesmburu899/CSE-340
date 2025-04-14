const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  try {
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
 *  Get vehicle detail by inventory_id
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

const invModel = {}

async function getInventoryByClassificationId(classificationId) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classificationId]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error)
    throw error
  }
}

async function getInventoryByInventoryId(invId) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [invId]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryByInventoryId error: " + error)
    throw error
  }
}

async function testConnection() {
  try {
    return await pool.query("SELECT NOW()")
  } catch (error) {
    console.error("Database connection test error:", error)
    throw error
  }
}

invModel.addClassification = async function(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    console.error("Add classification error:", error)
    throw error
  }
}

invModel.addInventory = async function(inventoryData) {
  try {
    const sql = `INSERT INTO inventory (
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`
    
    const values = [
      inventoryData.inv_make,
      inventoryData.inv_model,
      inventoryData.inv_year,
      inventoryData.inv_description,
      inventoryData.inv_image,
      inventoryData.inv_thumbnail,
      inventoryData.inv_price,
      inventoryData.inv_miles,
      inventoryData.inv_color,
      inventoryData.classification_id
    ]
    
    return await pool.query(sql, values)
  } catch (error) {
    console.error("Add inventory error:", error)
    throw error
  }
}

invModel.updateClassification = async function(classification_id, classification_name) {
  try {
    const sql = "UPDATE classification SET classification_name = $1 WHERE classification_id = $2 RETURNING *"
    return await pool.query(sql, [classification_name, classification_id])
  } catch (error) {
    console.error("Update classification error:", error)
    throw error
  }
}

invModel.deleteClassification = async function(classification_id) {
  try {
    const sql = "DELETE FROM classification WHERE classification_id = $1 RETURNING *"
    return await pool.query(sql, [classification_id])
  } catch (error) {
    console.error("Delete classification error:", error)
    throw error
  }
}

invModel.updateInventory = async function(inventoryData) {
  try {
    const sql = `UPDATE inventory SET
      inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4,
      inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_miles = $8,
      inv_color = $9, classification_id = $10
      WHERE inv_id = $11 RETURNING *`
    
    const values = [
      inventoryData.inv_make,
      inventoryData.inv_model,
      inventoryData.inv_year,
      inventoryData.inv_description,
      inventoryData.inv_image,
      inventoryData.inv_thumbnail,
      inventoryData.inv_price,
      inventoryData.inv_miles,
      inventoryData.inv_color,
      inventoryData.classification_id,
      inventoryData.inv_id
    ]
    
    return await pool.query(sql, values)
  } catch (error) {
    console.error("Update inventory error:", error)
    throw error
  }
}

invModel.deleteInventory = async function(inv_id) {
  try {
    const sql = "DELETE FROM inventory WHERE inv_id = $1 RETURNING *"
    return await pool.query(sql, [inv_id])
  } catch (error) {
    console.error("Delete inventory error:", error)
    throw error
  }
}

module.exports = invModel

module.exports = {
  getClassifications,
  getVehiclesByClassificationId,
  getVehicleById,
  getInventoryByClassificationId,
  getInventoryByInventoryId,
  testConnection
}