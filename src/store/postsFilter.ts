import { create } from 'zustand';

type PostsFilterStore = {
  tag: string;
  setTag: (tag: string) => void;
};

export const usePostsFilterStore = create<PostsFilterStore>()((set) => ({
  tag: '',
  setTag: (tag) => set((state) => ({ tag: tag !== state.tag ? tag : '' })),
}));
