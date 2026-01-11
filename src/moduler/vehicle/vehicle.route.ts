import { Router } from "express";
import { vehicleController } from "./vehicle.controller";

const router = Router();

router.post("/", vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId", vehicleController.getVehicleById);
router.delete("/:vehicleId", vehicleController.deleteVehicleById);
router.put("/:vehicleId", vehicleController.updateVehicle);

export const vehicleRouter = router;