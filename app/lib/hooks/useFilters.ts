import { create } from "zustand";
import { IGetProductsFilters } from "../actions/goods";

interface useFiltersProps {
  filters: IGetProductsFilters;
  setFilters: (filters: IGetProductsFilters) => void;
}

const useFilters = create<useFiltersProps>((set) => ({
  filters: {
    category: null,
    search: null,
    min_price: null,
    max_price: null,
  },
  setFilters: (filters) => set({ filters }),
}));

export default useFilters;
