import 'dotenv/config';
import jwt = require('jsonwebtoken');
import { TUser } from '../protocols/types';

const secret = process.env.JWT_SECRET || 'your_secret';

const generateToken = (user: Omit<TUser, 'password'>): string => {
  const jwtConfig: jwt.SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret as string, jwtConfig);

  return token;
};
export default generateToken;
