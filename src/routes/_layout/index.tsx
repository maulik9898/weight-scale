import { AddRemoveWeight } from '@/components/AddRemoveWeight';
import { ProductSelection } from '@/components/ProductSelection';
import { TransactionList } from '@/components/TransactionList';
import { Button } from '@/components/ui/button';
import { useInventoryStore, useUserStore } from '@/store';
import { supabase } from '@/supabase';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: Index,
})


export function Index() {
  const selectedProductId = useInventoryStore((state) => state.selectedProductId);
  const user = useUserStore((state) => state.user)
  const productQuery = useQuery({
    queryKey: ["product", selectedProductId, user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("products")
        .select('*')
        .eq("id", selectedProductId!)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user && selectedProductId != null && selectedProductId !== undefined
  });

  const handleConnect = () => {
    navigator.bluetooth.getDevices({
      acceptAllDevices: true
    })
      .then(device => {
        console.log("device ", device)
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
  }
  return (
    <>
      <ProductSelection />
      {
        selectedProductId != undefined ?
          <>
            <div className=" p-4 text-2xl border-b rounded-none text-gray-500 font-semibold flex justify-between gap-2 w-full">
              <p>Inventory</p>
              <p className="">{productQuery.data?.weight} KG</p>
            </div>
            <AddRemoveWeight />
            <TransactionList />
          </> : <></>
      }
    </>
  )
}
