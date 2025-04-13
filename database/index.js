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

async function setupDatabase() {
  try {
    // Insert classifications if they don't exist
    await pool.query(`
      INSERT INTO classification (classification_name)
      VALUES ('Custom'), ('Sedan'), ('SUV'), ('Truck')
      ON CONFLICT (classification_name) DO NOTHING
    `)

    // Insert sample inventory data if none exists
    const inventoryCount = await pool.query('SELECT COUNT(*) FROM inventory')
    if (inventoryCount.rows[0].count === '0') {
      await pool.query(`
        INSERT INTO inventory (
          inv_make, inv_model, inv_year, inv_description, 
          inv_image, inv_thumbnail, inv_price, inv_miles, 
          inv_color, classification_id
        )
        VALUES 
        ('Toyota', 'Camry', 2022, 'Reliable sedan with great fuel economy',
         '/images/vehicles/camry.jpg', '/images/vehicles/camry-tn.jpg',
         25000, 1000, 'Silver', (SELECT classification_id FROM classification WHERE classification_name = 'Sedan')),
        ('Ford', 'F-150', 2023, 'Powerful truck for work and play',
         '/images/vehicles/f150.jpg', '/images/vehicles/f150-tn.jpg',
         45000, 500, 'Black', (SELECT classification_id FROM classification WHERE classification_name = 'Truck'))
      `)
    }

    // Verify data
    const results = await pool.query(`
      SELECT 
        c.classification_name,
        i.inv_make,
        i.inv_model
      FROM classification c
      LEFT JOIN inventory i ON c.classification_id = i.classification_id
      ORDER BY c.classification_name
    `)
    console.log('\n=== Database Content ===')
    console.log(results.rows)

  } catch (error) {
    console.error('Setup Error:', error.message)
  }
}

setupDatabase()

analyzeDatabase()

module.exports = pool