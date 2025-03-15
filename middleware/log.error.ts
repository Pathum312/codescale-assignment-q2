import { Response, Request, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
}

const handleErrors = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // Send an error response
  res.status(err.status || 500).json({ message: err.message });
};

export { handleErrors };
