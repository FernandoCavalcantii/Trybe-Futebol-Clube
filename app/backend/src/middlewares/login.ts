import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const login = (req: Request, res: Response, _next: NextFunction) => {
  const { token } = req.body;
  res.status(StatusCodes.OK).json({ token });
};

export default login;
