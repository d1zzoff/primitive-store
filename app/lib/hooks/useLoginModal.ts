import { create } from "zustand";

interface LoginModalState {
  isOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const useLoginModal = create<LoginModalState>((set) => ({
  isOpen: false,
  openLoginModal: () => set({ isOpen: true }),
  closeLoginModal: () => set({ isOpen: false }),
}));

export default useLoginModal;
