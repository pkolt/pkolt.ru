import { create } from 'zustand';

type FilterStore = {
  tag: string;
  setTag: (tag: string) => void;
};

export const useFilterStore = create<FilterStore>()((set) => ({
  tag: '',
  setTag: (tag) => set((state) => ({ tag: tag !== state.tag ? tag : '' })),
}));
