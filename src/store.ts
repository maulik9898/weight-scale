import { create } from 'zustand';

interface InventoryState {
  selectedProductId: number | null;
  setSelectedProductId: (productId: number | null) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  selectedProductId: null,
  setSelectedProductId: (productId) => set({ selectedProductId: productId }),
}));

export default useInventoryStore;
