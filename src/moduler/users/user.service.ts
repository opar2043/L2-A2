import bcrypt from "bcryptjs";
import { pool } from "../../dbStorage/db";
import { ROLE } from "./user.controller";
import  Jwt  from "jsonwebtoken";

const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
  phone: string,
  role: ROLE,
) => {
  const result = await pool.query(
    `INSERT INTO users 
       (name, email, password, phone, role)
       VALUES ($1, $2, $3, $4, $5)` +
      `
       RETURNING id, name, email, phone, role`,
    [name, email, hashedPassword, phone, role || ROLE.CUSTOMER],
  );

  return result;
};

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(` SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (result.rows.length === 0) return null;
  const user = result.rows[0];
  const matchPass = await bcrypt.compare(password, user.password);

  if (!matchPass) {
    return false;
  }

  const secret = process.env.JWT_SECRET;
   const token = Jwt.sign({name: user.name , email : user.email , role: user.role},secret as string, {
    expiresIn : '3d'
   })
   console.log({token , user});
  return {token , user};
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
  userId: string,
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
    [name, email, password, phone, role, userId],
  );

  return result;
};

export const userService = {
  createUser,
  getUsers,
  deleteUsers,
  updateUsers,
  loginUser,
};
