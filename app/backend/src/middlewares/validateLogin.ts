import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const loginValidate = (req: Request, res: Response, _next: NextFunction) => {
  const { user: { role } } = req.body;
  res.status(StatusCodes.OK).json({ role });
};

export default loginValidate;
