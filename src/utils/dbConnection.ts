import {connect} from "mongoose";
import dotenv from "dotenv";
import { IMessageInfo } from "./types";


export const dbConnection = async (): Promise<IMessageInfo> => {
  // setting envs  
  dotenv.config();
  try{
     // connect to mongoDB
  await connect(process.env.DB_CONNECTION_URL as string);
  return { success: true, message: "connected to db"}
  }catch(err: any) {
    return { success: false, message: err.message}
  }
 
}
