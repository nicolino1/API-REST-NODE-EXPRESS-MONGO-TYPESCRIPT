import User from "./model/User";
import { IUser, SessionInfo } from "./utils/userTypes";
import { IMessageInfo } from "../../utils/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (user: IUser): Promise<IMessageInfo> => {
  let res: IMessageInfo
  try {
    //checking for an existing email account
    const existingEmail = await User.findOne({ email: user.email });

    if (existingEmail !== null) {
      res = { success: false, message: "the email address already exist" }
    }
    else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      // replacing password in plane text for the hashed one
      user = { ...user, password: hashedPassword }
      const result = new User({
        ...user
      })

      const createdUser = await result.save();
      res = { success: true, message: "user was succesfuly created", data: createdUser };
    }
    console.log(res);
    return res
  } catch (err: any) {
    res = { success: false, message: err.message };
    console.log(res);
    return res
  }
}

export const login = async (user: SessionInfo): Promise<IMessageInfo> => {
  let res : IMessageInfo = { success: true, message: "sdds" };

  try{
    //checking for an existing email account
    const existing = await User.findOne({ email: user.email });

    if (existing === null) {
      res = { success: false, message: "the email address doesn't exist" }
    }
    else {
      const validPassword = await bcrypt.compare(user.password, existing.password);

      // Create token
      const token = jwt.sign({_id: existing._id}, process.env.TOKEN_SECRET as string);

      res = { success: validPassword, message: validPassword ? token : "wrong password"}
    }
    console.log(res);
    return res;
  }catch(err: any){
    res = { success: false, message: err.message };
    console.log(res);
    return res
  } 
}