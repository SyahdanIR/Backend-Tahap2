import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, description } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: Number(price),
        stock: Number(stock),
        description: description
      },
    });
    return res.status(201).json({
        message: "Product created successfully",
        data: newProduct
    });
  } catch (error) {
    res.status(500).json({ 
        message: "Failed to create product", 
        error: error.message, 
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json({
      message: "All products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        price: Number(price),
        stock: Number(stock),
        description: description,
      },
    });
    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error,
    });
  }
};