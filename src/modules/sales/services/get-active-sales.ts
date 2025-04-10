import { Sale } from "@/modules/sales/domain/sale";
import { ACTIVE_SALES_TABLE, openIndexedDB } from "@/db/indexedDB";

const getActiveSalesService = async (): Promise<Sale[]> => {
 const { readData } = await openIndexedDB({
     tableName: ACTIVE_SALES_TABLE,
   });
   const response = await readData() as Sale[];
   return response;
};

export const getActiveSales = async (): Promise<Sale[]> => {
  const response = await getActiveSalesService();
  return response;
};
