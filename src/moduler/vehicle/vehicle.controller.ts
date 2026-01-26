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

const getAllVehicles: RequestHandler = async (req, res) => {
  try {
    const result = await vehicleService.getAllVehicles();

    res.status(200).json({
      message: "Vehicles retrieved successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Loading Vehicle failed from Get",
      status: false,
      data: error.message,
    });
  }
};
const getVehicleById: RequestHandler = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    // console.log(vehicleId), "vehicle id";
    const result = await vehicleService.getVehicleById(vehicleId!);

    if (result.rows.length > 0) {
      res.status(200).json({
        message: "Vehicle retrieved successfully",
        status: true,
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Vehicle not found",
        status: false,
        data: [],
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "NO Vehicle Found",
      status: false,
      data: [],
    });
  }
};

const deleteVehicleById: RequestHandler = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    // console.log(vehicleId), "vehicle id";
    const result = await vehicleService.deleteVehicleById(vehicleId!);

    if (result.rowCount) {
      res.status(200).json({
        message: "Vehicle deleted successful",
        status: true,
        data: result.rows[0],
      });
    } else {
      res.status(404).json({
        message: "Vehicle not found",
        status: false,
        data: [],
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "SDomething happen wrong",
      status: false,
      data: [],
    });
  }
};

const updateVehicle: RequestHandler = async (req, res) => {
  try {
    const vehicleId = req.params.id ;
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;
    const result = await vehicleService.updateVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId as string
    );
    if (result.rowCount) {
      res.status(200).json({
        message: "Vehicle Updated successful",
        status: true,
        data: result.rows[0],
      });
    } else {
      res
        .status(404)
        .json({ message: "Vehicle not found", status: false, data: [] });
    }
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "Something happen wrong", status: false, data: [] });
  }
};

export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicle
};
