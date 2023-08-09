import Joi from "joi";
import { IMessageInfo, Data } from "./types";

/* Function used to validate fields that came in the request 
   parameters: 
      validateObject {Data}: data of the request
      schema {Joi.ObjectSchema}: specific entity schema
   returns: an object with the success or not of the function and
   an error/success message
*/
export const validateFields = (validateObject: Data, schema: Joi.ObjectSchema): IMessageInfo => {
  // validating data with the schema 
  const validation = schema.validate(validateObject)
  // response object declaration
  let response: IMessageInfo;
  // if validation error success is setting to false
  if (validation.error !== null && validation.error !== undefined) {
    response = { success: false, message: validation.error.message }
  }
  else response = { success: true, message: "valid body" }

  return response;
}