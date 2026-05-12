import { Request, Response } from "express";

export const getProfile = (req: Request, res: Response) => {
  return res.json({
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
  });
};

export const getUserbyId = (req: Request, res: Response) => {
  const { name } = req.params;
  return res.json({
    message: `Display user by name: ${name}`,
  });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  return res.status(201).json({
    message: `User created with name: ${name} and email: ${email}`,
    data: { name, email },
  });
};

export const hello = (req: Request, res: Response) => {
  res.send("Hello World!");
};
