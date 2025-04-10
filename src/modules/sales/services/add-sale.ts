import { Sale } from "@/modules/sales/domain/sale";
import { openIndexedDB, ACTIVE_SALES_TABLE } from "@/db/indexedDB";
import { AddSaleData, AddSalePort, addSaleSchema } from "@/modules/sales/domain/add-sale";

const addSaleService = async (data: AddSaleData): Promise<Sale> => {
  const { addData } = await openIndexedDB({
    tableName: ACTIVE_SALES_TABLE,
  });
  const id = await addData(data) as number;
  return {
    id,
    ...data
  };  
};

export const addSale: AddSalePort = async (data: AddSaleData) => {
  const parsedData = addSaleSchema.parse(data);
  const response = await addSaleService(parsedData);
  return response;
};
