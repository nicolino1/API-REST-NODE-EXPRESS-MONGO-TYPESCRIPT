import { Router } from 'express';
import { registerController, loginController } from '../entities/users/users.controller';
import { IUser } from '../entities/users/utils/userTypes';

// initilizing express router
export const router = Router();

// post method for user registration
router.post('/register', (req, res) => {
  // destructuring data in the request body
  const { name, email, password } = req.body;
  // creating user
  const user: IUser = {
    name, email, password
  }
  // call to register controller
  registerController(user)
    .then((result) =>
      // settings status and sending response 
      res.status(result.status as number)
        .send({ message: result.message, user: result.data }))
    .catch(e => console.log(e))

});

// post method for user login
router.post('/login', (req, res) => {
  // destructuring data in the request body
  const { name, email, password } = req.body;
  // creating user
  const user: IUser = {
    name, email, password
  }
  // call to login controller
  loginController(user)
    .then((result) =>
      // setting status and headers, and sending response
      res.status(result.status as number)
        .header('auth-token', result.message)
        .send({ message: result.message, user: result.data }))
    .catch(e => console.log(e))
});

