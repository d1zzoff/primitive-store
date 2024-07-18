import { create } from "zustand";

interface AddProductState {
  isOpen: boolean;
  openAddProduct: () => void;
  closeAddProduct: () => void;
}

const useAddProduct = create<AddProductState>((set) => ({
  isOpen: false,
  openAddProduct: () => set({ isOpen: true }),
  closeAddProduct: () => set({ isOpen: false }),
}));

export default useAddProduct;
