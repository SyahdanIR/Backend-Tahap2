import { Request, Response, NextFunction } from "express";

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey === "RAHASIA123") {
    next();
  } else {
    res.status(403).json({ message: "Akses ditolak! API Key tidak valid." });
  }
};