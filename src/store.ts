import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface InventoryState {
  selectedProductId: number | null;
  setSelectedProductId: (productId: number | null) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  selectedProductId: null,
  setSelectedProductId: (productId) => set({ selectedProductId: productId }),
}));


interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}


export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

