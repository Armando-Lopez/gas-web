import { Sale } from "@/modules/sales/domain/sale";
import { openIndexedDB, ACTIVE_SALES_TABLE } from "@/db/indexedDB";
import { UpdateSaleData, UpdateSalePort, updateSaleSchema } from "@/modules/sales/domain/update-sale";

const updateSaleService = async (id: number, data: UpdateSaleData): Promise<Sale> => {
  const { updateData } = await openIndexedDB({
    tableName: ACTIVE_SALES_TABLE,
  });
  const res = await updateData(id, data) as number;
  return {
    id: res,
    ...data
  };  
};

export const updateSale: UpdateSalePort = async (id, data) => {
  const parsedData = updateSaleSchema.parse(data);
  const response = await updateSaleService(id, parsedData);
  return response;
};
