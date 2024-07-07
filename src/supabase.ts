import { createClient } from "@supabase/supabase-js";
import { queryClient } from "./main";
import { Database } from "./types";
import { useInventoryStore, useUserStore } from "./store";

export const supabase = createClient<Database>("https://gjkstxhijrnjgkhrwnof.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqa3N0eGhpanJuamdraHJ3bm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1MTIwMDQsImV4cCI6MjAzMzA4ODAwNH0.LAVPAdhVePwEiuBeZ8k1HiTYxeZX6wHWg_HhvHnB4PE");

export const adjustProductWeight = async (weightChange: number) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw Error("User is not authenticated")
  }
  const userId = user.id
  const productId = useInventoryStore.getState().selectedProductId
  if (productId == undefined || productId == null) {
    throw Error("Product is not selected")
  }
  // Start a transaction
  const { data, error } = await supabase.rpc('adjust_product_weight', {
    p_product_id: productId,
    p_user_id: userId,
    p_weight_change: weightChange,
  });

  if (error) {
    console.error('Error adjusting product weight:', error);
    throw error;
  }
  queryClient.invalidateQueries({
    queryKey: ["product", productId]
  })
  queryClient.invalidateQueries({
    queryKey: ["transaction", productId]
  })
  return data;
};


// Initialize user state
supabase.auth.getSession().then(({ data: { session } }) => {
  useUserStore.getState().setUser(session?.user ?? null);
});

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useUserStore.getState().setUser(session?.user ?? null);
});

