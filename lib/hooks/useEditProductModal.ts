import { create } from "zustand";

interface editProductModalState {
  isOpen: boolean;
  productId: number | null;
  openEditProductModal: (v: number) => void;
  closeEditProductModal: () => void;
}

const useEditProductModal = create<editProductModalState>((set) => ({
  isOpen: false,
  productId: null,
  func: () => {},
  openEditProductModal: (productId: number) => set({ isOpen: true, productId }),
  closeEditProductModal: () => set({ isOpen: false, productId: null }),
}));

export default useEditProductModal;
