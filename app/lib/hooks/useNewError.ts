import { create } from "zustand";

export interface IError {
  id: number;
  message: string;
}

interface NewErrorState {
  error: IError[];
  newError: (v: string) => void;
  removeError: (id: number) => void;
}

const useNewError = create<NewErrorState>((set) => ({
  error: [],
  newError: (errorMessage) =>
    set((state) => {
      const id = Date.now();
      return {
        error: [...state.error, { id, message: errorMessage }],
      };
    }),
  removeError: (id) =>
    set((state) => ({
      error: state.error.filter((err) => err.id !== id),
    })),
}));

export default useNewError;
