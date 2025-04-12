const pool = require("./index")

const dbUtils = {}

dbUtils.runQuery = async function(sql, params) {
  try {
    const result = await pool.query(sql, params)
    return result.rows
  } catch (error) {
    console.error("Database Error:", error)
    throw error
  }
}

module.exports = dbUtils