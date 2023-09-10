import { create } from 'zustand';

type PostsFilterStore = {
  setTag: (tag: string) => void;
  tag: string;
};

export const usePostsFilterStore = create<PostsFilterStore>()((set) => ({
  setTag: (tag) => set((state) => ({ tag: tag !== state.tag ? tag : '' })),
  tag: '',
}));
