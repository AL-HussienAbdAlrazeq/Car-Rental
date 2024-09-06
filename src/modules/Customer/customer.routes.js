import { Router } from "express";
import {signup,signin , deleteUsers , getAllUsers , getSpecificUsers,updateUsers} from "./customer.controller.js"
import { checkEmailExist } from "../../middleware/checkEmailExist.js";
import { catchError } from "../../middleware/catchError.js";
import { validate } from "../../middleware/validate.js";
import { SigninValidation, SignupValidation, UpdateCustomerValidation } from "./customer.validation.js";


const customerRouter = Router()

customerRouter.post('/signup' , validate(SignupValidation) ,checkEmailExist ,catchError(signup))
customerRouter.post('/signin' , validate(SigninValidation),catchError(signin))
customerRouter.get('/:id',catchError(getSpecificUsers))
customerRouter.get('/',catchError(getAllUsers))
customerRouter.put('/:id', validate(UpdateCustomerValidation) , catchError(updateUsers))
customerRouter.delete('/:id',catchError(deleteUsers))





export default customerRouter