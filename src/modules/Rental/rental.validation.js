import Joi from "joi";

export const CreateRentalValidation = Joi.object({
  customerId: Joi.string().hex().length(24).required(),
  carId: Joi.string().hex().length(24).required(),
  rentalDate: Joi.date().required(),
  returnDate: Joi.date().required(),
});

export const UpdateRentalValidation = Joi.object({
  customerId: Joi.string().hex().length(24),
  carId: Joi.string().hex().length(24),
  rentalDate: Joi.date(),
  returnDate: Joi.date(),
  id: Joi.string().hex().length(24).required(),
});
