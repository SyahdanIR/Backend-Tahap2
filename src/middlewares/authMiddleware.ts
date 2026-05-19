import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Akses ditolak! Token tidak ada." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        status: "error",
        message: "Akses ditolak! Token tidak valid atau kedaluwarsa.",
      });
  }
};
