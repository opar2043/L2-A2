import { RequestHandler } from "express";
import { bookingService } from "./booking.service";

const createBooking: RequestHandler = async (req, res) => {
  try {
    const { customer_id } = req.body;
    const { vehicle_id, rent_start_date, rent_end_date } = req.body;

    const result = await bookingService.createBooking(
      customer_id!,
      rent_start_date as string,
      rent_end_date as string,
      vehicle_id!,
    );

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    res.status(201).json({
      status: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

const getBooking: RequestHandler = async (req, res) => {
  try {
    const result = await bookingService.getBooking();

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Booking retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

const deleteBooking: RequestHandler = async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log(bookingId);
    const result = await bookingService.deleteBooking(bookingId!);

    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }
    console.log(bookingId);
    res.status(200).json({
      status: true,
      message: "Deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

const updateBooking: RequestHandler = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const result = await bookingService.updateBooking(bookingId!);
    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }
    console.log(bookingId);
    res.status(200).json({
      status: true,
      message: "Booking Updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

const singleBooking: RequestHandler = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const result = await bookingService.singleBooking(bookingId!);
    if (!result.rowCount) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }
    console.log(bookingId);
    res.status(200).json({
      status: true,
      message: "Booking Found successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  }
};

export const bookingController = {
  createBooking,
  getBooking,
  deleteBooking,
  updateBooking,
  singleBooking,
};
