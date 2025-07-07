import { StatusCodes } from 'http-status-codes';
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;//500
  const msg = err.message || 'Something went wrong, try again later';//default message

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;