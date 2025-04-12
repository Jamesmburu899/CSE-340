const pool = require("../database/")

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

module.exports = {
  getInventoryByInventoryId,
}