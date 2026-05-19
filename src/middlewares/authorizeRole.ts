import { Request, Response, NextFunction } from "express";

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) {
            return res.status(401).json({ message: "Anda belum terautentikasi!" });
        }
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ 
              message: `Akses ditolak! fitur ini hanya untuk ${allowedRoles.join (", ")}` 
            });
        }
        next();
    } catch (error) {
        next(error);
    }
  }
}