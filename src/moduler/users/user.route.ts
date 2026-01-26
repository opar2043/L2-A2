import { Router } from "express";
import { ROLE, userController } from "./user.controller";
import auth from "../../middleware/verify";


const router = Router();

// POST /api/v1/users
router.post("/auth/signup", userController.createUser);
router.post("/auth/signin", userController.loginUser);
router.get("/users", auth(ROLE.ADMIN ), userController.getUsers);
router.delete("/users/:userId", auth(ROLE.ADMIN), userController.deleteUsers);
router.put("/users/:userId",auth(ROLE.ADMIN , ROLE.CUSTOMER), userController.updateUsers);


export const userRouter = router;
