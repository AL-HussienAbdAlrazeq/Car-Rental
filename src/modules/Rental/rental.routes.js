import { Router } from "express";
import { createRental, deleteRental, getAllRental, getSpecificRental, updateRental } from "./rental.controller.js";
import { catchError } from "../../middleware/catchError.js";
import { validate } from "../../middleware/validate.js";
import { CreateRentalValidation, UpdateRentalValidation } from "./rental.validation.js";



const rentalRouter = Router()

rentalRouter.post('/' , validate(CreateRentalValidation),catchError(createRental))
rentalRouter.put ('/:id' , validate(UpdateRentalValidation),catchError(updateRental))
rentalRouter.delete('/:id' , catchError(deleteRental))
rentalRouter.get('/' , catchError(getAllRental))
rentalRouter.get('/:id' , catchError(getSpecificRental))



export default rentalRouter