import Joi from 'joi'

export const SignupValidation = Joi.object({
    name:Joi.string().max(200).min(3).required(),
    email:Joi.string().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message('InValid Password').required(),
    phone:Joi.string().required(),
})

export const SigninValidation = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message('InValid Password'),
})

export const UpdateCustomerValidation = Joi.object({
    name:Joi.string().max(200).min(3),
    email:Joi.string().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).message('InValid Password'),
    phone:Joi.string(),
    id:Joi.string().hex().length(24).required()
})

