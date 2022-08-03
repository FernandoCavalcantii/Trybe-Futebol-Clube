import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) =>
  // errorSwitch(err.message, res);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
export default errorMiddleware;
