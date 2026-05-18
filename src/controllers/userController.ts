import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

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

export const transferPoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { senderId, receiverId, amount } = req.body;

  const dataSender = (await prisma.user.findUnique({
    where: { id: Number(senderId) },
    select: { name: true, point: true, id: true },
  })) || { name: "hamba allah", point: 0 };
  const dataReceiver = (await prisma.user.findUnique({
    where: { id: Number(receiverId) },
    select: { name: true },
  })) || { name: "hamba allah", point: 0 };

  if (Number(senderId) === null || Number(receiverId) === null) {
    return res
      .status(400)
      .json({ message: "Tidak dapat transfer point ke user yang tidak ada" });
  }

  if (Number(senderId) === Number(receiverId)) {
    return res
      .status(400)
      .json({ message: "Tidak dapat transfer point ke diri sendiri" });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({ message: "Jumlah point harus lebih dari 0" });
  }

  if (Number(amount) > dataSender.point) {
    return res.status(400).json({ message: "Jumlah point tidak cukup" });
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: Number(senderId) },
        data: { point: { decrement: amount } },
      }),
      prisma.user.update({
        where: { id: Number(receiverId) },
        data: { point: { increment: amount } },
      }),
    ]);
    return res.status(200).json({
      message: `Point transfered from ${dataSender.name} to ${dataReceiver.name}`,
      data: { senderId, receiverId, amount },
    });
  } catch (error: any) {
    error.message = "Transfer gagal, saldo tidak dikirim.";
    next(error);
  }
};
