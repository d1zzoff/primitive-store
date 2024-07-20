import { create } from "zustand";

interface RegisterModalState {
  isOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

const useRegisterModal = create<RegisterModalState>((set) => ({
  isOpen: false,
  openRegisterModal: () => set({ isOpen: true }),
  closeRegisterModal: () => set({ isOpen: false }),
}));

export default useRegisterModal;
