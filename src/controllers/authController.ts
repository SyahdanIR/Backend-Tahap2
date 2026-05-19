import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        profilePicture: image,
        password: hashedPassword,
      },
    });
    res.status(201).json({
        message: "User created successfully",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.profilePicture,
        },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "email atau password salah" });
        }
        const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "email atau password salah" });
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });
        res.status(200).json({
            message: "Login successful",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};
