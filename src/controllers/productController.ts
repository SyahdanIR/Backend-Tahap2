import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, stock, description} = req.body;
    const userId = (req as any).user.id;
    const image = req.file ? req.file.filename : null;
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: Number(price),
        stock: Number(stock),
        description: description,
        userId: Number(userId),
        image,
      },
    });
    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error: any) {
    error.message = "Something went wrong";
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { search, minPrice, sortBy } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search as string,
          mode: "insensitive",
        },
        price: {
          gte: minPrice ? Number(minPrice) : 0,
        },
      },
      take: limit,
      skip: skip,
      orderBy: {
        CreatedAt: sortBy === "oldest" ? "asc" : "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const totalData = await prisma.product.count();

    return res.status(200).json({
      message: "All products fetched successfully",
      meta: {
        current_page: page,
        limit: limit,
        total_data: totalData,
        total_pages: Math.ceil(totalData / limit),
      },
      data: products,
    });
  } catch (error: any) {
    error.message = "Something went wrong";
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error: any) {
    error.message = "Something went wrong";
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description, userId } = req.body;
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        price: Number(price),
        stock: Number(stock),
        description: description,
        userId: Number(userId),
      },
    });
    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error: any) {
    error.message = "Something went wrong";
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error: any) {
    error.message = "Something went wrong";
    next(error);
  }
};
