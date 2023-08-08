import Joi from "joi";
import { IMessageInfo, Data } from "./types";

export const validateFields = (validateObject: Data, schema: Joi.ObjectSchema) : IMessageInfo => {
  const validation = schema.validate(validateObject)
  let response: IMessageInfo;
  if (validation.error !== null && validation.error !== undefined) {
    response = { success: false, message: validation.error.message}
  }
  else response = { success: true, message: "valid body"}

  return response;
}