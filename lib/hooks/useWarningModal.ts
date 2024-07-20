import { create } from "zustand";

interface WarningModalState {
  isOpen: boolean;
  actionId: string | null;
  content: string | null;
  openWarningModal: (actionId: string, content: string) => void;
  closeWarningModal: () => void;
}

const useWarningModal = create<WarningModalState>((set) => ({
  isOpen: false,
  actionId: null,
  content: null,
  openWarningModal: (actionId: string, content: string) =>
    set({ isOpen: true, actionId, content }),
  closeWarningModal: () =>
    set({ isOpen: false, actionId: null, content: null }),
}));

export default useWarningModal;
