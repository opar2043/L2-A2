import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// POST /api/v1/users
router.post("/", userController.createUser);

export const userRouter = router;
