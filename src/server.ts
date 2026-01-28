import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first
import app from "./app";

import initDB, { pool } from "./dbStorage/db";
import { vehicleRouter } from "./moduler/vehicle/vehicle.route";
import { userRouter } from "./moduler/users/user.route";
import { bookingRouter } from "./moduler/bookings/booking.route";

// const PORT = process.env.port || 5000;

initDB();

// Vehicle route
app.use("/api/v1/vehicles", vehicleRouter);

// User route for sign up
app.use("/api/v1", userRouter);

// bookings route 
app.use("/api/v1/bookings", bookingRouter);



// app.listen(PORT, () => {
//   console.log("Server is running at port " + PORT);
// });

export default app;
