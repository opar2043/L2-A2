import { Pool } from "pg";
export const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_km2igf3rzjAv@ep-flat-surf-a8n5jany-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require"
});
// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const initDB = async () => {
  await pool.query(`
    
     CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type  VARCHAR(50) NOT NULL,
      registration_number VARCHAR(50) NOT NULL UNIQUE,
      daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(20) NOT NULL DEFAULT 'available'
     )
`);
  await pool.query(`
             CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'customer'
     )
        `);

  await pool.query(`
             CREATE TABLE IF NOT EXISTS bookings (
     id SERIAL PRIMARY KEY,
     customer_id INTEGER NOT NULL REFERENCES users(id),
     vehicle_id INTEGER NOT NULL REFERENCES vehicles(id),
     rent_start_date DATE NOT NULL,
     rent_end_date DATE NOT NULL,
     total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
     status VARCHAR(20) NOT NULL DEFAULT 'booked'
   )
        `);

  console.log("Database Initialized");
};


export default initDB;