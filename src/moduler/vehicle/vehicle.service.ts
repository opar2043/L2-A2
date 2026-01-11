import { pool } from "../../dbStorage/db";

const createVehicles = async (payload: {
  vehicle_name: string;
  type: string;
  registration_number: string;
  daily_rent_price: number;
  availability_status: boolean;
}) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles 
     (vehicle_name, type, registration_number, daily_rent_price, availability_status) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

const getVehicleById = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
  return result;
};

const deleteVehicleById = async (vehicleId: string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
  return result;
};

const updateVehicle = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: string,
  availability_status: string,
  vehicleId: string
) => {
  const result = await await pool.query(
    `UPDATE vehicles SET vehicle_name = $1, type = $2, registration_number = $3, daily_rent_price = $4, availability_status = $5 where id = $6 RETURNING * `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ]
  );
  return result;
};

export const vehicleService = {
  createVehicles,
  getAllVehicles,
  getVehicleById,
  deleteVehicleById,
  updateVehicle,
};
