import { IUser, SessionInfo } from "../entities/users/utils/userTypes";
import { IProduct } from "../entities/products/utils/productTypes";

export type Data = IUser | IUser[] | SessionInfo | IProduct | IProduct[] | string | null;

export interface IMessageInfo {
    success: boolean,
    message: string,
    data?: Data,
}
  
  export interface IResponse {
      status?: number,
      message?: string,
      data?: Data,
  }