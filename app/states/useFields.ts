import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  name: string;
  creditHours: number;
  grade: string;
};
type Actions = {};

const useFields = persist(
  create((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
  }))
);

return useFields;
