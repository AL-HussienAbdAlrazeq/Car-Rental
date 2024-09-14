import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { db } from "../../../database/db.connection.js";
import { AppError } from "../../utils/appError.js";

const signup = async (req, res, next) => {
  const user = await db.collection("customers").insertOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  });
  res.status(200).json({ message: "Success", user });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.collection("customers").findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new AppError("Incorrect email or password", 401));
  } else {
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      (err, token) => {
        res.status(200).json({ message: "Login", token });
      }
    );
  }
};

const getSpecificUsers = async (req, res) => {
  const user = await db
    .collection("customers")
    .find({ _id: new ObjectId(req.params.id) })
    .toArray();
  res.json({ message: "Success", user });
};

const getAllUsers = async (req, res) => {
  const user = await db.collection("customers").find().toArray();
  res.json({ message: "Success", user });
};

const updateUsers = async (req, res) => {
  const user = await db
    .collection("customers")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.json({ message: "Updated", user });
};

const deleteUsers = async (req, res) => {
  await db
    .collection("customers")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Deleted" });
};

export {
  signup,
  signin,
  getSpecificUsers,
  getAllUsers,
  updateUsers,
  deleteUsers,
};
