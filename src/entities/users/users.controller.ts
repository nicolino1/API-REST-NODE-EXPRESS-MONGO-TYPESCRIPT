import { register, login } from "./users.service";
import { IUser, SessionInfo } from "./utils/userTypes";
import { validateFields } from "../../utils/validation";
import { userValidateSchema } from "./utils/userValidateSchema";
import { IMessageInfo, IResponse } from "../../utils/types";

export const registerController = async (user: IUser): Promise<IResponse> => {
  // response
  let response: IResponse; 
  // fields validation
  const validation = validateFields(user, userValidateSchema); 
  if (!validation.success) { response = {status: 400, message: validation.message, data: user} }
  else {
    const result: IMessageInfo = await register(user);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data}
  }
  return response
}

export const loginController = async (user: SessionInfo): Promise<IResponse> => {
  // response
  let response: IResponse; 
  // fields validation
  const validation = validateFields(user, userValidateSchema); 
  if (!validation.success) { response = {status: 400, message: validation.message, data: user} }
  else {
    const result: IMessageInfo = await login(user);
    response = { status: result.success ? 200 : 400, message: result.message, data: result.data}
  }
  return response
}
