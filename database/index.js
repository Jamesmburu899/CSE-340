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
    // Check if inventory table exists with correct structure
    const checkInventory = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'inventory'
    `)
    
    // If inventory table doesn't have the right columns, drop and recreate it
    if (checkInventory.rows.length === 0 || 
        !checkInventory.rows.some(col => col.column_name === 'inv_price')) {
      
      console.log('Recreating inventory table with correct structure...')
      
      // Drop the table if it exists
      await pool.query(`DROP TABLE IF EXISTS inventory`)
      
      // Create inventory table with correct structure
      await pool.query(`
        CREATE TABLE inventory (
          inv_id SERIAL PRIMARY KEY,
          inv_make VARCHAR(30) NOT NULL,
          inv_model VARCHAR(30) NOT NULL,
          inv_year INTEGER NOT NULL,
          inv_description TEXT NOT NULL,
          inv_image VARCHAR(50) NOT NULL,
          inv_thumbnail VARCHAR(50) NOT NULL,
          inv_price NUMERIC(9,2) NOT NULL,
          inv_miles INTEGER NOT NULL,
          inv_color VARCHAR(20) NOT NULL,
          classification_id INTEGER NOT NULL REFERENCES classification(classification_id)
        )
      `)
    }

    // Insert classifications if they don't exist
    await pool.query(`
      INSERT INTO classification (classification_name)
      VALUES ('Custom'), ('Sedan'), ('SUV'), ('Truck'), ('Sport')
      ON CONFLICT (classification_name) DO NOTHING
    `)

    // Check current inventory count
    const invCount = await pool.query(`SELECT COUNT(*) FROM inventory`)

    // If inventory is empty or has very few items, add sample data
    if (parseInt(invCount.rows[0].count) < 10) {
      console.log('Adding sample inventory data with variety...')
      
      // Clear existing inventory to ensure correct counts
      await pool.query(`TRUNCATE TABLE inventory RESTART IDENTITY CASCADE`)
      
      // Sedan variety
      const sedanMakes = ['Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia'];
      const sedanModels = ['Camry', 'Accord', 'Altima', 'Sonata', 'K5'];
      const sedanColors = ['Silver', 'White', 'Black', 'Blue', 'Red'];
      const sedanDescriptions = [
        'Reliable sedan with great fuel economy',
        'Comfortable family sedan with advanced safety features',
        'Stylish sedan with modern technology',
        'Economical sedan with spacious interior',
        'Sporty sedan with excellent handling'
      ];
      
      // Add 25 Sedan vehicles with variety
      for (let i = 1; i <= 25; i++) {
        const makeIndex = i % sedanMakes.length;
        const modelIndex = i % sedanModels.length;
        const colorIndex = i % sedanColors.length;
        const descIndex = i % sedanDescriptions.length;
        const year = 2018 + (i % 6); // Years between 2018-2023
        const price = 18000 + Math.floor(Math.random() * 15000); // $18,000 - $33,000
        const miles = Math.floor(Math.random() * 60000); // 0 - 60,000 miles
        
        await pool.query(`
          INSERT INTO inventory (
            inv_make, inv_model, inv_year, inv_description, 
            inv_image, inv_thumbnail, inv_price, inv_miles, 
            inv_color, classification_id
          )
          VALUES 
          ('${sedanMakes[makeIndex]}', '${sedanModels[modelIndex]}', ${year}, '${sedanDescriptions[descIndex]}',
           '/images/vehicles/sedan${i % 5 + 1}.jpg', '/images/vehicles/sedan${i % 5 + 1}-tn.jpg',
           ${price}, ${miles}, '${sedanColors[colorIndex]}', 
           (SELECT classification_id FROM classification WHERE classification_name = 'Sedan'))
        `)
      }
      
      // Custom variety
      const customMakes = ['Custom', 'Modified', 'Bespoke', 'Unique', 'Personalized'];
      const customModels = ['One-Off', 'Special', 'Signature', 'Limited', 'Exclusive'];
      const customColors = ['Custom Paint', 'Metallic', 'Matte Black', 'Chrome', 'Two-Tone'];
      const customDescriptions = [
        'One-of-a-kind custom build with premium features',
        'Modified vehicle with performance upgrades',
        'Bespoke design with luxury interior',
        'Custom vehicle with unique styling elements',
        'Personalized build with state-of-the-art technology'
      ];
      
      // Add 20 Custom vehicles
      for (let i = 1; i <= 20; i++) {
        const makeIndex = i % customMakes.length;
        const modelIndex = i % customModels.length;
        const colorIndex = i % customColors.length;
        const descIndex = i % customDescriptions.length;
        const year = 2020 + (i % 4); // Years between 2020-2023
        const price = 35000 + Math.floor(Math.random() * 25000); // $35,000 - $60,000
        const miles = Math.floor(Math.random() * 10000); // 0 - 10,000 miles (custom cars typically have low mileage)
        
        await pool.query(`
          INSERT INTO inventory (
            inv_make, inv_model, inv_year, inv_description, 
            inv_image, inv_thumbnail, inv_price, inv_miles, 
            inv_color, classification_id
          )
          VALUES 
          ('${customMakes[makeIndex]}', '${customModels[modelIndex]} ${i}', ${year}, '${customDescriptions[descIndex]}',
           '/images/vehicles/custom${i % 5 + 1}.jpg', '/images/vehicles/custom${i % 5 + 1}-tn.jpg',
           ${price}, ${miles}, '${customColors[colorIndex]}', 
           (SELECT classification_id FROM classification WHERE classification_name = 'Custom'))
        `)
      }
      
      // Sport variety
      const sportMakes = ['Ferrari', 'Porsche', 'Lamborghini', 'McLaren', 'Aston Martin'];
      const sportModels = ['458', '911', 'Aventador', '720S', 'Vantage'];
      const sportColors = ['Red', 'Yellow', 'Black', 'Silver', 'Green'];
      const sportDescriptions = [
        'High-performance sports car with incredible speed',
        'Precision-engineered sports car with racing heritage',
        'Exotic sports car with breathtaking design',
        'Track-ready sports car with advanced aerodynamics',
        'Luxury sports car with powerful engine'
      ];
      
      // Add 12 Sport vehicles
      for (let i = 1; i <= 12; i++) {
        const makeIndex = i % sportMakes.length;
        const modelIndex = i % sportModels.length;
        const colorIndex = i % sportColors.length;
        const descIndex = i % sportDescriptions.length;
        const year = 2019 + (i % 5); // Years between 2019-2023
        const price = 90000 + Math.floor(Math.random() * 160000); // $90,000 - $250,000
        const miles = Math.floor(Math.random() * 15000); // 0 - 15,000 miles
        
        await pool.query(`
          INSERT INTO inventory (
            inv_make, inv_model, inv_year, inv_description, 
            inv_image, inv_thumbnail, inv_price, inv_miles, 
            inv_color, classification_id
          )
          VALUES 
          ('${sportMakes[makeIndex]}', '${sportModels[modelIndex]}', ${year}, '${sportDescriptions[descIndex]}',
           '/images/vehicles/sport${i % 5 + 1}.jpg', '/images/vehicles/sport${i % 5 + 1}-tn.jpg',
           ${price}, ${miles}, '${sportColors[colorIndex]}', 
           (SELECT classification_id FROM classification WHERE classification_name = 'Sport'))
        `)
      }
      
      // SUV variety
      const suvMakes = ['Honda', 'Toyota', 'Ford', 'Chevrolet', 'Jeep'];
      const suvModels = ['CR-V', 'RAV4', 'Explorer', 'Tahoe', 'Grand Cherokee'];
      const suvColors = ['Blue', 'Black', 'White', 'Silver', 'Gray'];
      const suvDescriptions = [
        'Family SUV with great features and safety',
        'Spacious SUV with comfortable interior',
        'Versatile SUV for all your adventures',
        'Rugged SUV with off-road capabilities',
        'Reliable SUV with excellent cargo space'
      ];
      
      // Add 10 SUV vehicles
      for (let i = 1; i <= 10; i++) {
        const makeIndex = i % suvMakes.length;
        const modelIndex = i % suvModels.length;
        const colorIndex = i % suvColors.length;
        const descIndex = i % suvDescriptions.length;
        const year = 2017 + (i % 7); // Years between 2017-2023
        const price = 28000 + Math.floor(Math.random() * 22000); // $28,000 - $50,000
        const miles = Math.floor(Math.random() * 45000); // 0 - 45,000 miles
        
        await pool.query(`
          INSERT INTO inventory (
            inv_make, inv_model, inv_year, inv_description, 
            inv_image, inv_thumbnail, inv_price, inv_miles, 
            inv_color, classification_id
          )
          VALUES 
          ('${suvMakes[makeIndex]}', '${suvModels[modelIndex]}', ${year}, '${suvDescriptions[descIndex]}',
           '/images/vehicles/suv${i % 5 + 1}.jpg', '/images/vehicles/suv${i % 5 + 1}-tn.jpg',
           ${price}, ${miles}, '${suvColors[colorIndex]}', 
           (SELECT classification_id FROM classification WHERE classification_name = 'SUV'))
        `)
      }
      
      // Truck variety
      const truckMakes = ['Ford', 'Chevrolet', 'RAM', 'Toyota', 'GMC'];
      const truckModels = ['F-150', 'Silverado', '1500', 'Tundra', 'Sierra'];
      const truckColors = ['Black', 'White', 'Red', 'Blue', 'Gray'];
      const truckDescriptions = [
        'Powerful truck for work and play',
        'Heavy-duty truck with impressive towing capacity',
        'Reliable truck with excellent payload capacity',
        'Rugged truck built for tough jobs',
        'Versatile truck with advanced technology'
      ];
      
      // Add 10 Truck vehicles
      for (let i = 1; i <= 10; i++) {
        const makeIndex = i % truckMakes.length;
        const modelIndex = i % truckModels.length;
        const colorIndex = i % truckColors.length;
        const descIndex = i % truckDescriptions.length;
        const year = 2018 + (i % 6); // Years between 2018-2023
        const price = 32000 + Math.floor(Math.random() * 28000); // $32,000 - $60,000
        const miles = Math.floor(Math.random() * 50000); // 0 - 50,000 miles
        
        await pool.query(`
          INSERT INTO inventory (
            inv_make, inv_model, inv_year, inv_description, 
            inv_image, inv_thumbnail, inv_price, inv_miles, 
            inv_color, classification_id
          )
          VALUES 
          ('${truckMakes[makeIndex]}', '${truckModels[modelIndex]}', ${year}, '${truckDescriptions[descIndex]}',
           '/images/vehicles/truck${i % 5 + 1}.jpg', '/images/vehicles/truck${i % 5 + 1}-tn.jpg',
           ${price}, ${miles}, '${truckColors[colorIndex]}', 
           (SELECT classification_id FROM classification WHERE classification_name = 'Truck'))
        `)
      }
      
      console.log('Sample inventory data with variety added successfully')
    }

    console.log('Database setup completed successfully')
  } catch (error) {
    console.error('Setup Error:', error.message)
  }
}

setupDatabase()

analyzeDatabase()

// Add a function to get vehicles by classification
async function getVehiclesByClassification(classification_name) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory AS i 
      JOIN classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE c.classification_name = $1`,
      [classification_name]
    )
    return data.rows
  } catch (error) {
    console.error("getVehiclesByClassification error " + error)
  }
}

// Add a function to get vehicle details by ID
async function getVehicleById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getVehicleById error " + error)
  }
}

// Add a function to get all classifications for navigation
async function getClassifications() {
  try {
    const data = await pool.query(
      `SELECT * FROM classification ORDER BY classification_name`
    )
    return data.rows
  } catch (error) {
    console.error("getClassifications error " + error)
  }
}

// Export the functions
module.exports = {
  pool,
  getVehiclesByClassification,
  getVehicleById,
  getClassifications
}