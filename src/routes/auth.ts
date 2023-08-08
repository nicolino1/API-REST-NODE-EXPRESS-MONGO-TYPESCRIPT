import { Router } from 'express';
import { registerController, loginController } from '../entities/users/users.controller';
import { IUser } from '../entities/users/utils/userTypes';

export const router = Router();

router.post('/register', (req, res) =>  {
    const { name, email, password } = req.body;
    const user: IUser = {
    name, email, password
    }
  registerController(user).then((result) => res.status(result.status as number).send({message: result.message, user: result.data})).catch(e => console.log(e))
  
} );

router.post('/login', (req, res) => {
  const { name, email, password } = req.body;
    const user: IUser = {
    name, email, password
    }
  loginController(user).then((result) => res.status(result.status as number).header('auth-token', result.message).send({message: result.message, user: result.data})).catch(e => console.log(e))
});

