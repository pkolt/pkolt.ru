import { create } from 'zustand';

export enum Theme {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}

type ThemeStore = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

export const useThemeStore = create<ThemeStore>()((set) => ({
  theme: Theme.System,
  setTheme: (theme) => set(() => ({ theme })),
}));
