import { supabase } from "@/supabase";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables } from "@/types";
import { useInventoryStore, useUserStore } from "@/store";

export function ProductSelection() {
  const user = useUserStore((state) => state.user)

  const productQuery = useQuery<Tables<'products'>[]>({
    queryKey: ['products', user?.id],
    queryFn:
      async () => {
        if (!user) throw new Error('Not authenticated');
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('user_id', user.id)
        if (error) throw error;
        return data;
      },
    enabled: !!user
  });

  const selectedProductId = useInventoryStore((state) => state.selectedProductId);
  const setSelectedProductId = useInventoryStore((state) => state.setSelectedProductId);

  const handleProductChange = (productId: number) => {
    setSelectedProductId(productId);
  };

  return (
    <div className="p-4 gap-2 border-b rounded-none flex justify-between w-full">
      <Select

        value={selectedProductId?.toString() || ''}
        onValueChange={(value) => handleProductChange(Number(value))}
      >
        <SelectTrigger className="w-full h-12 text-xl">
          <SelectValue placeholder="Select Product" />
        </SelectTrigger>
        <SelectContent>
          {productQuery.data && productQuery.data.map((data) => (
            <SelectItem key={data.id} value={data.id.toString()}>
              {data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      { /* <Button onClick={() => supabase.auth.signOut()} variant="secondary">Log out</Button> */}
    </div>
  );
}
