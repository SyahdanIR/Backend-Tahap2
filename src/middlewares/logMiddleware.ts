import { Request, Response, NextFunction } from "express";

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  next();
};