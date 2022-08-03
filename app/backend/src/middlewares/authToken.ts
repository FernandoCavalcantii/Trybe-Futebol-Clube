import 'dotenv/config';
import { Response, NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt = require('jsonwebtoken');
import CustomError from '../helpers/CustomError';

const secret = process.env.JWT_SECRET || 'your_secret';

const authToken = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }

    try {
      const { data } = jwt.verify(token, secret) as jwt.JwtPayload;
      req.body.user = data;
    } catch (err) {
      throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default authToken;
