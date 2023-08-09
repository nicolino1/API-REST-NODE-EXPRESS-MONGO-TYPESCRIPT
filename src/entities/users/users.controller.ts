import { register, login } from "./users.service";
import { IUser, SessionInfo } from "./utils/userTypes";
import { validateFields } from "../../utils/validation";
import { userValidateSchema } from "./utils/userValidateSchema";
import { IMessageInfo, IResponse } from "../../utils/types";

/* registerController receives an user object, validates the data in that object
   then calls register service and finally creates and returns the response
   parameters: 
    user {IUser}: user data
    returns response object
*/
export const registerController = async (user: IUser): Promise<IResponse> => {
  // response object declaration
  let response: IResponse;
  // fields validation
  const validation = validateFields(user, userValidateSchema);
  // if validation fails 
  if (!validation.success) { response = { status: 400, message: validation.message, data: user } }
  else {
    // if validation success
    // call to register service with user object
    const result: IMessageInfo = await register(user);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }
  }
  return response
}

/* loginController receives an user session object (only email and password)
   validates the data in that object, then calls register service and finally 
   creates and returns the response
   parameters: 
    user {SessionInfo}: user session data
    returns response object
*/
export const loginController = async (user: SessionInfo): Promise<IResponse> => {
  // response object declaration
  let response: IResponse;
  // fields validation
  const validation = validateFields(user, userValidateSchema);
  // if validation fails 
  if (!validation.success) { response = { status: 400, message: validation.message, data: user } }
  else {
    // if validation success
    // call to login service with user object
    const result: IMessageInfo = await login(user);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data }
  }
  return response
}
