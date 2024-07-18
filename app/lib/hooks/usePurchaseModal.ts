import { create } from "zustand";

interface PurchaseModalState {
  isOpen: boolean;
  productId: number | null;
  openPurchaseModal: (v: number) => void;
  closePurchaseModal: () => void;
}

const usePurchaseModal = create<PurchaseModalState>((set) => ({
  isOpen: false,
  productId: null,
  openPurchaseModal: (productId) => set({ isOpen: true, productId }),
  closePurchaseModal: () => set({ isOpen: false, productId: null }),
}));

export default usePurchaseModal;
