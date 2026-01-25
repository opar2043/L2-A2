import { RequestHandler } from "express";
import { userService } from "./user.service";
import bcrypt from "bcryptjs";

export enum ROLE {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

const createUser: RequestHandler = async (req, res) => {
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

    const result = await userService.createUser(
      name,
      email as string,
      hashedPassword,
      phone,
      role as ROLE
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
};

const getUsers : RequestHandler = async (req, res) => {
  try {
    const result = await userService.getUsers()

    res.status(200).json({
      message: "Users retrieved successfully",
      status: true,
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Loading Users failed from Get",
      status: false,
      data: error.message,
    });
  }
}

const deleteUsers : RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await userService.deleteUsers(userId!)

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
}
const updateUsers : RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password, phone, role } = req.body;

    const result = await userService.updateUsers(name , email as string , password as string ,phone , role , userId!)

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
}

const loginUser : RequestHandler = async (req, res) => {
  try {
    const {email , password} = req.body;
    const result = await userService.loginUser(email , password);

    res.status(200).json({
      message: "Users login successful",
      status: true,
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Login failed",
      status: false,
      data: error.message,
    });
  }
}

export const userController = {
  createUser,
  getUsers,
  deleteUsers,
  updateUsers,
  loginUser
};
