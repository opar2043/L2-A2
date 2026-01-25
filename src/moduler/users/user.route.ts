import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/verify";


const router = Router();

// POST /api/v1/users
router.post("/auth/signup", userController.createUser);
router.post("/auth/signin", userController.loginUser);
router.get("/users", auth(), userController.getUsers);
router.delete("/users/:userId", userController.deleteUsers);
router.put("/users/:userId", userController.updateUsers);


export const userRouter = router;
