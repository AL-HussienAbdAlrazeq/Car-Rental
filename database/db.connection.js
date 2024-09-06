import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

export function connection() {
  client
    .connect()
    .then(() => {
      console.log("Server is Running : ");
    })
    .catch(() => {
      console.log("DataBase Error ");
    });
}

export const db = client.db("car_Rental");
