import { Router } from "express";

import { validate } from "../../middleware/validate.js";
import { CreateCarValidation, UpdateCarValidation } from "./car.validation.js";
import { addCar, deleteCar, getAllCars, getSpecificCar, updateCar } from "./car.controller.js";
import { catchError } from "../../middleware/catchError.js";


const carRouter = Router()

carRouter.post('/',validate(CreateCarValidation) ,catchError(addCar) )
carRouter.get('/:id' , catchError(getSpecificCar))
carRouter.get('/' , catchError(getAllCars))
carRouter.put('/:id' ,validate(UpdateCarValidation), catchError(updateCar))
carRouter.delete('/:id' , catchError(deleteCar))
// carRouter.get('/model',getModel)
// carRouter.get('/status' , getStatus)
// carRouter.get('/rent' , getRentedCar)



export default carRouter