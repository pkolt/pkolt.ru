import cn from 'classnames';
import { Theme, useThemeStore } from '@/store/theme';
import styles from './index.module.css';
import { useCallback } from 'react';

const mapIcons: Record<Theme, string> = {
  [Theme.System]: 'bi-circle-half',
  [Theme.Dark]: 'bi-circle-fill',
  [Theme.Light]: 'bi-circle',
};

export const ThemeButton = (): JSX.Element => {
  const { theme, setTheme } = useThemeStore();

  const handleClick = useCallback(() => {
    const list = [Theme.System, Theme.Dark, Theme.Light];
    const index = list.findIndex((value) => value === theme);
    const nextTheme = index === list.length - 1 ? list[0] : list[index + 1];
    setTheme(nextTheme);
  }, [setTheme, theme]);

  return <i className={cn(styles.container, mapIcons[theme])} onClick={handleClick} role="button" />;
};
