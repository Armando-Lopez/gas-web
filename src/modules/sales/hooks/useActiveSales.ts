import useSWR from "swr";
import { getActiveSales } from "@/modules/sales/services/get-active-sales";

export const useActiveSales = () => {
  const { data, error, isLoading, mutate } = useSWR("active-sales", () =>
    getActiveSales()
  );
  return { data, error, isLoading, mutate };
};
