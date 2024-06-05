import useInventoryStore from "@/store";
import { supabase } from "@/supabase";
import { useQuery } from "@tanstack/react-query"
import { Transaction } from "./Transaction";

export function TransactionList() {
  const selectedProductId = useInventoryStore((state) => state.selectedProductId);
  const transactions = useQuery({
    queryKey: ["transaction", selectedProductId],
    queryFn: async () => {
      const { data } = await supabase.from('transactions').select().eq("product_id", selectedProductId!).limit(100).order("timestamp", { ascending: false })
      return data
    }
  })
  return (
    <div className="flex overflow-scroll  flex-1 min-h-0  flex-col ">
      {transactions.data && transactions.data.map((tr) => <Transaction tr={tr} key={tr.timestamp} />)}
    </div>
  )
}
