import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

import app from "./app";
import initDB, { pool } from "./dbStorage/db";
import { vehicleController } from "./moduler/vehicle/vehicle.controller";
import { vehicleRouter } from "./moduler/vehicle/vehicle.route";
import { userRouter } from "./moduler/users/user.route";
import bcrypt from "bcryptjs";
import verify from "./middleware/verify";
import { bookingRouter } from "./moduler/bookings/booking.route";

const PORT = process.env.port || 5000;

initDB();

// Vehicle route
app.use("/api/v1/vehicles", vehicleRouter);

// User route for sign up
app.use("/api/v1", userRouter);

app.use("/api/v1/bookings", bookingRouter);


// ? user rourtes  http://localhost:5000/api/v1/auth/signup




// ? bookings rourtes  http://localhost:5000/api/v1/bookings

// app.post("/api/v1/bookings", async (req, res) => {
//   try {
//     const {
//       customer_id,
//       vehicle_id,
//       rent_start_date,
//       rent_end_date,
//     } = req.body;

//     const result = await pool.query(
//       `
//       INSERT INTO bookings (
//         customer_id,
//         vehicle_id,
//         rent_start_date,
//         rent_end_date,
//         total_price,
//         status
//       )
//       SELECT
//         $1,
//         v.id,
//         $2::date,
//         $3::date,
//         (($3::date - $2::date) * v.daily_rent_price),
//         'active'
//       FROM vehicles v
//       WHERE v.id = $4
//       RETURNING *;
//       `,
//       [customer_id, rent_start_date, rent_end_date, vehicle_id]
//     );

//     if (!result.rowCount) {
//       return res.status(404).json({
//         status: false,
//         message: "Vehicle not found",
//       });
//     }

//     res.status(201).json({
//       status: true,
//       message: "Booking created successfully",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Something went wrong",
//     });
//   }
// });

// app.get("/api/v1/bookings", async (req, res) => {
//   try {
//     const result = await pool.query(`SELECT * FROM bookings`);

//     if (!result.rowCount) {
//       return res.status(404).json({
//         status: false,
//         message: "Vehicle not found",
//       });
//     }

//     res.status(200).json({
//       status: true,
//       message: "Booking retrieved successfully",
//       data: result.rows,
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Something went wrong",
//     });
//   }
// });

// app.put("/api/v1/bookings/:bookingId",  async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const result = await pool.query(`UPDATE bookings SET status= 'cancelled' 
//       WHERE id = $1 RETURNING *`, [bookingId]);

//     if (!result.rowCount) {
//       return res.status(404).json({
//         status: false,
//         message: "Vehicle not found",
//       });
//     }
//     console.log(bookingId);
//     res.status(200).json({
//       status: true,
//       message: "Booking Updated successfully",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Something went wrong",
//     });
//   }
// });

// app.delete("/api/v1/bookings/:bookingId", async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const result = await pool.query(`DELETE FROM bookings 
//       WHERE id = $1 RETURNING *`, [bookingId]);

//     if (!result.rowCount) {
//       return res.status(404).json({
//         status: false,
//         message: "Vehicle not found",
//       });
//     }
//     console.log(bookingId);
//     res.status(200).json({
//       status: true,
//       message: "Deleted successfully",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({
//       status: false,
//       message: "Something went wrong",
//     });
//   }
// });

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});
