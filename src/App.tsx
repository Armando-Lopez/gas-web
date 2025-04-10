import PWABadge from "./PWABadge.tsx";
import { ActiveSales } from "@/modules/sales/components/active-sales.tsx";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/shared/components/ui/tabs.tsx";

function App() {
  return (
    <>
      <Tabs defaultValue="active-sales" className="w-full h-dvh flex flex-col">
        <div className="flex-grow">
          <TabsContent value="active-sales" className="px-4">
            <ActiveSales />
          </TabsContent>
        </div>
        <TabsList className="flex justify-between w-full sticky bottom-0 py-5 bg-white border-t rounded-none">
          <TabsTrigger value="active-sales">Ventas</TabsTrigger>
        </TabsList>
      </Tabs>
      <PWABadge />
    </>
  );
}

export default App;
