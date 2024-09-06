import bcrypt from "bcrypt"
import { AppError } from "../utils/appError.js"
import { db } from "../../database/db.connection.js"
const customerModel = db.collection('customers')

export const checkEmailExist = async(req,res,next)=>{
    const {email } = req.body
    const isEmail = await customerModel.findOne({email})
    if(isEmail) return next(new AppError("Email already exist", 409)) 
        req.body.password = bcrypt.hashSync(req.body.password , 8)
    next()
}