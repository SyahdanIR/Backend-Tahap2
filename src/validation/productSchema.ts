import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3, "Nama produk minimal 3 karakter"),
    price: z.coerce.number().positive("Harga tidak boleh negatif"),
    stock: z.coerce.number().positive("Stock tidak boleh negatif"),
    description: z.string().optional(),
})