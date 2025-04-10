import React from "react";
import { Sale } from "@/modules/sales/domain/sale";
import { formatCurrency } from "@/shared/utils/formatters";
import { UpdateSale } from "@/modules/sales/components/update-sale";
import { useActiveSales } from "@/modules/sales/hooks/useActiveSales";

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
            <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-200 p-4 hover:shadow-lg">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-gray-800">{sale.client}</div>
                <div className="text-naranja font-bold text-base">
                  {formatCurrency(sale.sale)}
                </div>
              </div>

              <div className="text-sm text-gray-500 mt-2">
                <span className="block">
                  Compra: <span className="text-gray-700">{sale.saleDate}</span>
                </span>
                <span className="block">
                  Cobro:{" "}
                  <span className="text-gray-700">{sale.paymentDate}</span>
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-500">
                  {sale.observations}
                </span>
              </div>
            </div>
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
