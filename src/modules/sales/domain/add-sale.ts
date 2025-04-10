import { z } from "zod";
import { Sale, saleSchema } from "@/modules/sales/domain/sale";

export const DEFAULT_PAYMENT_DAYS = 15;

export const addSaleSchema = saleSchema.omit({ id: true });

export type AddSaleData = z.infer<typeof addSaleSchema>;

export type AddSalePort = (data: AddSaleData) => Promise<Sale>
