import cn from 'classnames';
import { Theme, useThemeStore } from '@/store/theme';
import styles from './index.module.css';
import { useCallback } from 'react';

interface ThemeInfo {
  iconCls: string;
  title: string;
}

const mapTheme: Record<Theme, ThemeInfo> = {
  [Theme.System]: { iconCls: 'bi-circle-half', title: 'Auto' },
  [Theme.Dark]: { iconCls: 'bi-circle-fill', title: 'Dark' },
  [Theme.Light]: { iconCls: 'bi-circle', title: 'Light' },
};

export const ThemeButton = (): JSX.Element => {
  const { theme, setTheme } = useThemeStore();

  const handleClick = useCallback(() => {
    const list = [Theme.System, Theme.Dark, Theme.Light];
    const index = list.findIndex((value) => value === theme);
    const nextTheme = index === list.length - 1 ? list[0] : list[index + 1];
    setTheme(nextTheme);
  }, [setTheme, theme]);

  const themeInfo = mapTheme[theme];

  return (
    <i
      className={cn(styles.container, themeInfo.iconCls)}
      title={themeInfo.title}
      onClick={handleClick}
      role="button"
    />
  );
};
