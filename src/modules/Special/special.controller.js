import { db } from "../../../database/db.connection.js";

const carModel = db.collection("cars");

const special1 = async (req, res, next) => {
  const car = await carModel
    .find({ model: { $in: ["Toyota", "Honda"] } })
    .toArray();
  return car
    ? res.json({ message: "Success", car })
    : res.json({ message: "Car not found" });
};

const special2 = async (req, res, next) => {
  const car = await carModel
    .find({ model: req.query.model, rental_status: "Available" })
    .toArray();
  return car.length
    ? res.json({ message: "Success", car })
    : res.json({ message: "Car not found" });
};

const special3 = async (req, res, next) => {
  const { model } = req.query;
  let condition = {};

  if (model) {
    condition.model = model;
  } else {
    condition.rental_status = "rented";
  }

  const car = await carModel.find(condition).toArray();
  return car.length
    ? res.json({ message: "Success", car })
    : res.json({ message: "Car not found" });
};

const special4 = async (req, res, next) => {
  const { model } = req.query;

  const car = await carModel.find({ $or: [{rental_status:"Available" , model},{rental_status:"rented" , model}] }).toArray();
  return car.length
    ? res.json({ message: "Success", car })
    : res.json({ message: "Car not found" });
};

export { special1, special2, special3, special4 };
