import { supabase } from "@/supabase";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useInventoryStore from '../store';
import { Button } from "./ui/button";

export function ProductSelection() {
  const productQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await supabase.from('products').select();
      return data;
    },
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
        <SelectTrigger className="w-full">
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
      <Button onClick={() => supabase.auth.signOut()} variant="secondary">Log out</Button>
    </div>
  );
}
