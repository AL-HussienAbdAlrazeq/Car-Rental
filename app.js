import express from "express";
import { connection } from "./database/db.connection.js";
import specialRouter from "./src/modules/Special/special.routes.js";
import { globalError } from "./src/middleware/globalError.js";
import customerRouter from "./src/modules/Customer/customer.routes.js";
import carRouter from "./src/modules/Car/car.routes.js";
import rentalRouter from "./src/modules/Rental/rental.routes.js";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 3000;;

connection();
app.use(express.json());

app.use('/customers' , customerRouter)
app.use('/cars' , carRouter)
app.use('/rentals' , rentalRouter)
app.use("/specials", specialRouter);

app.use(globalError)

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
