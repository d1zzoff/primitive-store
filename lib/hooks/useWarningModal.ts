import { create } from "zustand";

interface WarningModalState {
  isOpen: boolean;
  content: string | null;
  func: (v?: any) => void;
  openWarningModal: (content: string, func: (v?: any) => void) => void;
  closeWarningModal: () => void;
}

const useWarningModal = create<WarningModalState>((set) => ({
  isOpen: false,
  content: null,
  func: () => {},
  openWarningModal: (content: string, func: (v?: any) => void) =>
    set({ isOpen: true, content, func }),
  closeWarningModal: () =>
    set({ isOpen: false, content: null, func: () => {} }),
}));

export default useWarningModal;
