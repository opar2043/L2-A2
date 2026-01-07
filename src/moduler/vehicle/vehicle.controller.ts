import { RequestHandler } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle: RequestHandler = async (req, res) => {
  try {
    const result = await vehicleService.createVehicles(req.body);

    res.status(201).json({
      message: "Vehicle added successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Vehicle added failed from post",
      status: false,
      data: error.message,
    });
  }
};

export const vehicleController = {
  createVehicle,
};
