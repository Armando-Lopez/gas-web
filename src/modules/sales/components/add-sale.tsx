import React from "react";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { addSale } from "@/modules/sales/services/add-sale";
import { useActiveSales } from "@/modules/sales/hooks/useActiveSales";
import { AddSaleData, addSaleSchema } from "@/modules/sales/domain/add-sale";
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
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
} from "@/shared/components/ui/dialog";

export const AddSale = () => {
  const [open, setOpen] = React.useState(false);

  const { mutate } = useActiveSales();
  const form = useForm<AddSaleData>({
    defaultValues: {
      sale: "",
      client: "",
      saleDate: "",
      paymentDate: "",
      observations: "",
    },
    resolver: zodResolver(addSaleSchema),
  });

  async function onSubmit(data: AddSaleData) {
    await addSale(data);
    mutate();
    form.reset();
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="size-10 font-bold rounded-full fixed bottom-13 right-4">
          <UserPlus />
        </Button>
      </DialogTrigger>
      <DialogContent bottom>
        <DialogTitle>Agregar venta</DialogTitle>
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
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Agregar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
