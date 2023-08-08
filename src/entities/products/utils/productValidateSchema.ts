import Joi from "joi";

export const productValidateSchema = Joi.object({
  prdId: Joi.string().max(255).optional(),
  title: Joi.string().min(6).max(255).required(),
  description: Joi.string().min(6).max(255).required(),
  imageUrl: Joi.string().min(6).max(1024).required().uri(),
  brand: Joi.string().min(6).max(1024).required(),
  category: Joi.array().min(1).max(3).required(),
  stock: Joi.number(),
  price: Joi.number(),
})