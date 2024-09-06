import Joi from 'joi'

export const CreateCarValidation = Joi.object({
    name:Joi.string().max(200).min(3).required(),
    model:Joi.string().required(),
    rental_status:Joi.string().required(),
})



export const UpdateCarValidation = Joi.object({
    name:Joi.string().max(200).min(3),
    model:Joi.string(),
    rental_status:Joi.string(),
    id:Joi.string().hex().length(24).required()
})

