import { z } from "zod";

export const DEFAULT_PAYMENT_DAYS = 15;

export const saleSchema = z.object({
  id: z.number().int().positive(),
  sale: z.string().min(1, { message: "requerido" }),
  client: z.string().min(1, { message: "requerido" }),
  saleDate: z.string().min(1, { message: "requerido" }),
  paymentDate: z.string().min(1, { message: "requerido" }),
  observations: z.string(),
})

export type Sale = z.infer<typeof saleSchema>;