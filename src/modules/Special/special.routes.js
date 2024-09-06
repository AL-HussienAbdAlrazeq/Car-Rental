import { Router } from "express";
import {  special1, special2, special3, special4 } from "./special.controller.js";
import { catchError } from "../../middleware/catchError.js";


const specialRouter = Router()
specialRouter.get('/special1' , catchError(special1))
specialRouter.get('/special2' , catchError(special2))
specialRouter.get('/special3' , catchError(special3))
specialRouter.get('/special4' , catchError(special4))




export default specialRouter