import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddWeight } from "./AddWeight"
import { RemoveWeight } from "./RemoveWeight"
import useInventoryStore from "@/store";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
export function AddRemoveWeight() {

  const selectedProductId = useInventoryStore((state) => state.selectedProductId);

  const productQuery = useQuery({
    queryKey: ["product", selectedProductId],
    queryFn: async () => {
      const { data } = await supabase.from("products").select().eq("id", selectedProductId!)
      return data && data[0] || undefined
    },
    enabled: selectedProductId != undefined || selectedProductId != null
  })
  return (
    <div className="border-b rounded-none flex  justify-between items-center p-4 bg-muted/40">
      <Tabs defaultValue="add" className="w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="add">Add</TabsTrigger>
            <TabsTrigger value="remove">Remove</TabsTrigger>
          </TabsList>
          <p className="text-4xl font-semibold">{productQuery.data?.weight}</p>
        </div>
        <TabsContent value="add"><AddWeight /></TabsContent>
        <TabsContent value="remove"><RemoveWeight /></TabsContent>
      </Tabs>
    </div>
  )

}
