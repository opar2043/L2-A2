import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

// POST /api/v1/users
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.delete("/:userId", userController.deleteUsers);
router.put("/:userId", userController.updateUsers);

export const userRouter = router;
