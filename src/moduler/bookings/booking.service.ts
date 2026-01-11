import { pool } from "../../dbStorage/db";

const createBooking = async (
  customer_id: string,
  rent_start_date: string,
  rent_end_date: string,
  vehicle_id: string
) => {
  const result = await pool.query(
    `
      INSERT INTO bookings (
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        status
      )
      SELECT
        $1,
        v.id,
        $2::date,
        $3::date,
        (($3::date - $2::date) * v.daily_rent_price),
        'active'
      FROM vehicles v
      WHERE v.id = $4
      RETURNING *;
      `,
    [customer_id, rent_start_date, rent_end_date, vehicle_id]
  );
  return result;
};

const getBooking = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};


const updateBooking = async (bookingId: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status= 'cancelled' 
      WHERE id = $1 RETURNING *`,
    [bookingId]
  );
  return result;
};


const deleteBooking = async (bookingId: string) => {
  const result = await pool.query(
    `DELETE FROM bookings 
      WHERE id = $1 RETURNING *`,
    [bookingId]
  );

  return result;
};
export const bookingService = {
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
};
