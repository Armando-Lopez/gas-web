import { z } from "zod";
import { Sale, saleSchema } from "@/modules/sales/domain/sale";

export const updateSaleSchema = saleSchema.omit({ id: true });

export type UpdateSaleData = z.infer<typeof updateSaleSchema>;

export type UpdateSalePort = (
  id: number,
  data: UpdateSaleData
) => Promise<Sale>;
