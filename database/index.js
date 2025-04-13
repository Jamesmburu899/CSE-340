const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

async function analyzeDatabase() {
  try {
    // Basic connection test
    const timeResult = await pool.query('SELECT NOW()')
    console.log('\n=== Database Connection ===')
    console.log('Connected at:', timeResult.rows[0].now)

    // Table structure analysis
    console.log('\n=== Table Structures ===')
    const tableStructure = await pool.query(`
      SELECT 
        table_name,
        column_name,
        data_type,
        character_maximum_length
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `)
    tableStructure.rows.forEach(col => {
      console.log(`${col.table_name}.${col.column_name}: ${col.data_type}${col.character_maximum_length ? `(${col.character_maximum_length})` : ''}`)
    })

    // Classification analysis
    console.log('\n=== Classifications Count ===')
    const classCount = await pool.query('SELECT COUNT(*) FROM classification')
    console.log('Total classifications:', classCount.rows[0].count)

    // Inventory analysis
    console.log('\n=== Inventory Statistics ===')
    const inventoryStats = await pool.query(`
      SELECT 
        COUNT(*) as total_vehicles,
        AVG(inv_price) as avg_price,
        MIN(inv_year) as oldest_year,
        MAX(inv_year) as newest_year
      FROM inventory
    `)
    console.log('Inventory Statistics:', inventoryStats.rows[0])

    // Vehicles by classification
    console.log('\n=== Vehicles per Classification ===')
    const vehiclesByClass = await pool.query(`
      SELECT 
        c.classification_name,
        COUNT(i.inv_id) as vehicle_count
      FROM classification c
      LEFT JOIN inventory i ON c.classification_id = i.classification_id
      GROUP BY c.classification_name
      ORDER BY vehicle_count DESC
    `)
    vehiclesByClass.rows.forEach(row => {
      console.log(`${row.classification_name}: ${row.vehicle_count} vehicles`)
    })

  } catch (error) {
    console.error('\nDatabase Error:', error.message)
  }
}

analyzeDatabase()

module.exports = pool