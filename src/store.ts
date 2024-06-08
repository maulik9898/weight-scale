import { create } from 'zustand';

interface InventoryState {
  device: BluetoothDevice | null;
  setDevice: (device: BluetoothDevice | null) => void;
  selectedProductId: number | null;
  setSelectedProductId: (productId: number | null) => void;
}

const useInventoryStore = create<InventoryState>((set) => ({
  device: null,
  setDevice: (device) => set({ device: device }),
  selectedProductId: null,
  setSelectedProductId: (productId) => set({ selectedProductId: productId }),
}));

export default useInventoryStore;
