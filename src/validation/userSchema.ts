import { z } from "zod";

export const createTransferSchema = z.object({
    senderId: z.coerce.number().int("Sender ID harus berupa angka bulat"),
    receiverId: z.coerce.number().int("Receiver ID harus berupa angka bulat"),
    amount: z.coerce.number().positive("Jumlah point harus positif"),
})