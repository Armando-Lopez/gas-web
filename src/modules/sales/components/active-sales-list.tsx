import React, { useMemo } from "react";
import { Sale } from "@/modules/sales/domain/sale";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";
import { UpdateSale } from "@/modules/sales/components/update-sale";
import { useActiveSales } from "@/modules/sales/hooks/useActiveSales";
import { dateDifferenceInDays, getTodayDate } from "@/shared/utils/date";
import { cn } from "@/shared/utils/tailwind-merge";

export const ActiveSalesList = () => {
  const { data } = useActiveSales();
  const [selectedSale, setSelectedSale] = React.useState<Sale | null>(null);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <div className="space-y-4 pb-4">
        {data?.map((sale) => (
          <button
            key={sale.id}
            className="block w-full text-left"
            onClick={() => {
              setSelectedSale(sale);
              setShowModal(true);
            }}
          >
            <ActiveSaleItem sale={sale} />
          </button>
        ))}
      </div>
      {selectedSale && (
        <UpdateSale
          sale={selectedSale}
          open={showModal}
          onOpenChange={setShowModal}
          onSuccess={() => {
            setShowModal(false);
            setSelectedSale(null);
          }}
        />
      )}
    </div>
  );
};

function ActiveSaleItem({ sale }: Readonly<{ sale: Sale }>) {
  const hasDue = useMemo(() => {
    return dateDifferenceInDays(sale.paymentDate, getTodayDate()) < 0;
  }, [sale.paymentDate]);

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow border border-gray-200 p-3">
      <div className="flex justify-between gap-4">
        <div className="font-semibold text-gray-800">{sale.client}</div>
        <div className="font-semibold">{formatCurrency(sale.sale)}</div>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        <span className="block">
          Compra:{" "}
          <span className="text-gray-700">{formatDate(sale.saleDate)}</span>
        </span>
        <span className="block">
          Cobro:{" "}
          <span
            className={cn(
              "font-semibold",
              hasDue ? "text-destructive" : "text-green-500"
            )}
          >
            {formatDate(sale.paymentDate)}
          </span>
        </span>
      </div>
      <div>
        <span className="text-sm text-gray-500">{sale.observations}</span>
      </div>
    </div>
  );
}
