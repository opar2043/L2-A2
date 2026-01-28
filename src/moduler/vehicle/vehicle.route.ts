import { Router } from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/verify";
import { ROLE } from "../users/user.controller";

const router = Router();

router.post("/",  vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getVehicleById);
router.delete("/:vehicleId"  ,vehicleController.deleteVehicleById);
router.put("/:vehicleId", auth(ROLE.ADMIN), vehicleController.updateVehicle);

export const vehicleRouter = router;