import User from "./model/User";
import { IUser, SessionInfo } from "./utils/userTypes";
import { IMessageInfo } from "../../utils/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* register service receives an user object, and creates a new user
   if the email account is not registered before
   parameters: 
    user {IUser}: user data
   returns message info object
*/
export const register = async (user: IUser): Promise<IMessageInfo> => {
  // message info object declaration
  let res: IMessageInfo
  try {
    //checking for an existing email account
    const existingEmail = await User.findOne({ email: user.email });
    // if email account exist on database
    if (existingEmail !== null) {
      res = { success: false, message: "the email address already exist" }
    }
    else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      // encrypting the password with salt value
      const hashedPassword = await bcrypt.hash(user.password, salt);
      // replacing password in plane text for the hashed one
      user = { ...user, password: hashedPassword }
      // creating new user
      const result = new User({
        ...user
      })
      // saving user 
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

/* login service receives an user object, validates the user data
   and returns the authorization token if data is correct
   parameters: 
    user {SessionInfo}: user session data
   returns message info object
*/
export const login = async (user: SessionInfo): Promise<IMessageInfo> => {
  // message info object declaration
  let res: IMessageInfo = { success: true, message: "sdds" };

  try {
    // checking for an existing email account
    const existing = await User.findOne({ email: user.email });
    // if email account isn't stored in database 
    if (existing === null) {
      res = { success: false, message: "the email address doesn't exist" }
    }
    else {
      // if email account exist on database
      // compares password with the hash stored on database
      const validPassword = await bcrypt.compare(user.password, existing.password);

      // Create token
      const token = jwt.sign({ _id: existing._id }, process.env.TOKEN_SECRET as string);
      // if password validations fails, returns wrong password, if not, returns auth token
      res = { success: validPassword, message: validPassword ? token : "wrong password" }
    }
    console.log(res);
    return res;
  } catch (err: any) {
    res = { success: false, message: err.message };
    console.log(res);
    return res
  }
}