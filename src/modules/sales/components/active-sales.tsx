import { ActiveSalesList } from "@/modules/sales/components/active-sales-list";
import { AddSale } from "./add-sale";

export const ActiveSales = () => {
  return (
    <div>
      <ActiveSalesList />
      <AddSale />
    </div>
  );
};
