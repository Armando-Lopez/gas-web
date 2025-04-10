import React from "react";
import { useForm } from "react-hook-form";
import { Sale } from "@/modules/sales/domain/sale";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { updateSale } from "@/modules/sales/services/update-sale";
import { useActiveSales } from "@/modules/sales/hooks/useActiveSales";
import {
  UpdateSaleData,
  updateSaleSchema,
} from "@/modules/sales/domain/update-sale";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form-builder";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/shared/components/ui/dialog";

export const UpdateSale = ({
  sale,
  onSuccess,
  ...props
}: { sale: Sale; onSuccess?: () => void } & React.ComponentProps<
  typeof Dialog
>) => {
  const { mutate } = useActiveSales();
  const form = useForm<UpdateSaleData>({
    defaultValues: {
      sale: sale.sale,
      client: sale.client,
      saleDate: sale.saleDate,
      paymentDate: sale.paymentDate,
      observations: sale.observations,
    },
    resolver: zodResolver(updateSaleSchema),
  });

  async function onSubmit(data: UpdateSaleData) {
    await updateSale(sale.id, data);
    mutate();
    form.reset();
    onSuccess?.();
  }
  
  return (
    <Dialog {...props}>
      <DialogContent bottom>
        <DialogTitle>Actualizar venta</DialogTitle>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form
            autoComplete="off"
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-interaction-sm">Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="sale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-interaction-sm">Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="100.000" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="saleDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-interaction-sm">
                    Fecha de venta
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="dd/mm/aaaa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-interaction-sm">
                    Fecha de cobro
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="dd/mm/aaaa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-interaction-sm">
                    Observaciones
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex flex-row justify-end gap-5 mt-5">
              <Button variant="outline">Eliminar</Button>
              <Button type="submit">Actualizar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
