const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool
 * SSL configuration for database connection
 * Database contains vehicle inventory for Sedan, SUV, and Truck classifications
 * with filtering capabilities for price, year, and make
 * *************** */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This allows connecting to databases with self-signed certificates
  },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20
})

// Log any errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

module.exports = pool