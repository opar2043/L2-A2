import { pool } from "../../dbStorage/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
}) => {
  const { name, email, password, phone, role = "user" } = payload;

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users 
     (name, email, password, phone, role) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING id, name, email, phone, role`,
    [
      name,
      email,
      hashedPassword,
      phone,
      role,
    ]
  );

  return result.rows[0];
};

export const userService = {
  createUser,
};
