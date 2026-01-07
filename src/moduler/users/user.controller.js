import { RequestHandler } from "express";
import { userService } from "./user.service";

const createUser: RequestHandler = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);

    res.status(201).json({
      message: "User added successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "User creation failed",
      status: false,
      error: error.message,
    });
  }
};

export const userController = {
  createUser,
};
