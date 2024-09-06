import { ObjectId } from "mongodb";

import { AppError } from "../../utils/appError.js";
import { db } from "../../../database/db.connection.js";

const createRental = async (req, res, next) => {
  const { customerId, carId, returnDate, rentalDate } = req.body;
  const customer = await db
    .collection("customers")
    .findOne({ _id: new ObjectId(customerId) });
  if (!customer) return next(new AppError("Customer not found", 404));
  const car = await db.collection("cars").findOne({ _id: new ObjectId(carId) });
  if (!car) return next(new AppError("Car not found", 404));

  if (car.rental_status !== "Available")
    return next(new AppError("Car is not available ", 404));

  await db
    .collection("cars")
    .updateOne(
      { _id: new ObjectId(carId) },
      { $set: { rental_status: "rented" } }
    );

  await db.collection("rentals").insertOne({
    customerId: new ObjectId(customerId),
    carId: new ObjectId(carId),
    rentalDate: new Date(rentalDate),
    returnDate: new Date(returnDate),
  });

  res.status(200).json({ message: "Success" });
};

const updateRental = async (req, res) => {
  const { rentalDate, returnDate } = req.body;
  const rental = await db
    .collection("rentals")
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          rentalDate: new Date(rentalDate),
          returnDate: new Date(returnDate),
        },
      }
    );
  res.status(201).json({ message: "Updated", rental });
};

const deleteRental = async (req, res) => {
  const { id } = req.params;
  const { deletedCount } = await db
    .collection("rentals")
    .deleteOne({ _id: new ObjectId(id) });
  return deletedCount
    ? res.json({ message: "Deleted" })
    : res.json({ message: "Invalid Id" });
};

const getAllRental = async (req, res) => {
  const all = await db
    .collection("rentals")
    .aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customersData",
        },
      },
      {
        $lookup: {
          from: "cars",
          localField: "carId",
          foreignField: "_id",
          as: "carData",
        },
      },
    ])
    .toArray();
  res.json({ message: "Success", all });
};

const getSpecificRental = async (req, res) => {
  const allRental = await db
    .collection("rentals")
    .aggregate([
      { $match: { _id: new ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customersData",
        },
      },
      {
        $lookup: {
          from: "cars",
          localField: "carId",
          foreignField: "_id",
          as: "carData",
        },
      },
    ])
    .toArray();
  res.json({ message: "Success", allRental });
};

export {
  createRental,
  updateRental,
  deleteRental,
  getAllRental,
  getSpecificRental,
};
