import 'dotenv/config';
import { Response, NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../helpers/CustomError';
import decryptPass from '../helpers/decryptPass';
import noPassUserObj from '../helpers/noPassUserObj';
import UsersModel from '../repository/users.model';
import generateToken from './generateToken';

const emailPasswordCheck = (email: string, password: string): void => {
  if (!email || !password) {
    throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled');
  }
};

const pwCheck = (pw: string, dbPw: string) => {
  const correctPw = decryptPass(pw, dbPw);

  if (!correctPw) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
};

const loginValidation = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    emailPasswordCheck(email, password);

    const user = await new UsersModel().readUserByEmail(email);

    if (!user) throw new CustomError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    const noPassUser = noPassUserObj(user.id, user.username, user.role, user.email);

    pwCheck(password, user.password);

    const token = generateToken(noPassUser);
    req.body.token = token;

    next();
  } catch (err) {
    next(err);
  }
};

export default loginValidation;
