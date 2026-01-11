import { pool } from "../../dbStorage/db";
import { ROLE } from "./user.controller";

const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  phone: string,
  role: ROLE
) => {
  const result = await pool.query(
    `INSERT INTO users 
       (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5)` +
      `
       RETURNING id, name, email, phone, role`,
    [name, email, hashedPassword, phone, role || ROLE.CUSTOMER]
  );

  return result;
};

const getUsers = async () => {
  const result = pool.query(`SELECT * FROM users`);
  return result;
};

const deleteUsers = async (userId: string) => {
  const result = pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

  return result;
};

const updateUsers = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: ROLE,
  userId: string
) => {
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

  return result;
};

export const userService = {
  createUser,
  getUsers,
  deleteUsers,
  updateUsers,
};
