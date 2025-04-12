const pool = require("../database/")

const invModel = {}

async function getClassifications() {
  try {
    const data = await pool.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    )
    return data.rows
  } catch (error) {
    console.error("getclassifications error " + error)
    throw error
  }
}

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

module.exports = invModel

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryByInventoryId,
  testConnection
}