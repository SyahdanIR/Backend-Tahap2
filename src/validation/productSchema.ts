import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3, "Nama produk minimal 3 karakter"),
    price: z.coerce.number().positive("Harga tidak boleh negatif"),
    stock: z.number().positive("Stock tidak boleh negatif"),
    description: z.string().optional(),
    userId: z.coerce.number().int("User ID harus berupa angka bulat"),
})