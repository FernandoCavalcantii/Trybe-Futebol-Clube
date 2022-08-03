import { Router } from 'express';
import authToken from '../middlewares/authToken';
import login from '../middlewares/login';
import loginValidation from '../middlewares/loginValidation';
import loginValidate from '../middlewares/validateLogin';

const loginRouter = Router();

const loginPath = '/login';
const loginValidatePath = '/login/validate';

loginRouter.post(loginPath, loginValidation, login);

loginRouter.get(loginValidatePath, authToken, loginValidate);

export default loginRouter;
