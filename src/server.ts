import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

import app from "./app";
import initDB, { pool } from "./dbStorage/db";
import { vehicleController } from "./moduler/vehicle/vehicle.controller";
import { vehicleRouter } from "./moduler/vehicle/vehicle.route";
import { userRouter } from "./moduler/users/user.route";
import bcrypt from "bcryptjs";
import verify from "./middleware/verify";

const PORT = process.env.port || 5000;

initDB();

app.use("/api/v1/vehicles", vehicleRouter);
// app.use("/api/v1/auth/signup", userRouter);

app.get("/api/v1/vehicles", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM vehicles`);

    res.status(200).json({
      message: "Vehicles retrieved successfully",
      status: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Loading Vehicle failed from Get",
      status: false,
      data: error.message,
    });
  }
});

app.get("/api/v1/vehicles/:vehicleId", async (req, res) => {
  try {
    const { vehicleId } = req.params;
    // console.log(vehicleId), "vehicle id";
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
      vehicleId,
    ]);

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "Vehicle retrieved successfully",
        status: true,
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Vehicle not found",
        status: false,
        data: [],
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "NO Vehicle Found",
      status: false,
      data: [],
    });
  }
});

app.delete("/api/v1/vehicles/:vehicleId", async (req, res) => {
  try {
    const { vehicleId } = req.params;
    // console.log(vehicleId), "vehicle id";
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [
      vehicleId,
    ]);

    if (result.rowCount) {
      res.status(200).json({
        message: "Vehicle deleted successful",
        status: true,
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Vehicle not found",
        status: false,
        data: [],
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "SDomething happen wrong",
      status: false,
      data: [],
    });
  }
});

app.put("/api/v1/vehicles/:vehicleId", async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;
    const result = await pool.query(
      `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 where id = $6 RETURNING * `,
      [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        vehicleId,
      ]
    );
    if (result.rowCount) {
      res
        .status(200)
        .json({
          message: "Vehicle Updated successful",
          status: true,
          data: result.rows[0],
        });
    } else {
      res
        .status(404)
        .json({ message: "Vehicle not found", status: false, data: [] });
    }
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Something happen wrong", status: false, data: [] });
  }
});

// ? user rourtes  http://localhost:5000/api/v1/auth/signup

app.post("/api/v1/auth/signup", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users 
       (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5)` +
        `
       RETURNING id, name, email, phone, role`,
      [name, email, hashedPassword, phone, role || "user"]
    );

    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

app.get("/api/v1/auth/users", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      message: "Users retrieved successfully",
      status: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Loading Vehicle failed from Get",
      status: false,
      data: error.message,
    });
  }
});

app.delete("/api/v1/auth/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      userId,
    ]);

    res.status(200).json({
      message: "User deleted successfully",
      status: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Loading users failed from Get",
      status: false,
      data: error.message,
    });
  }
});

app.put("/api/v1/auth/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, phone, role } = req.body;

    const result = await pool.query(
      `
      UPDATE users SET
        name = $1,
        email = $2,
        password = $3,
        phone = $4,
        role = $5
        WHERE id = $6
        RETURNING id, name, email, phone, role
      `,
      [name, email, password, phone, role, userId]
    );

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

// ? bookings rourtes  http://localhost:5000/api/v1/bookings

app.post("/api/v1/bookings", async (req, res) => {
  try {
    const {
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
    } = req.body;

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

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    res.status(201).json({
      status: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

app.get("/api/v1/bookings", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM bookings`);

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Booking retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

app.put("/api/v1/bookings/:bookingId",  async (req, res) => {
  try {
    const { bookingId } = req.params;
    const result = await pool.query(`UPDATE bookings SET status= 'cancelled' 
      WHERE id = $1 RETURNING *`, [bookingId]);

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }
    console.log(bookingId);
    res.status(200).json({
      status: true,
      message: "Booking Updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

app.delete("/api/v1/bookings/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const result = await pool.query(`DELETE FROM bookings 
      WHERE id = $1 RETURNING *`, [bookingId]);

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }
    console.log(bookingId);
    res.status(200).json({
      status: true,
      message: "Deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});
