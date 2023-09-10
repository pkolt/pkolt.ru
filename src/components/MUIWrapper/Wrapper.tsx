import { useColorScheme } from '@mui/joy';
import { useEffect } from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

//! Astro not supports CSS in JS.
//! https://github.com/withastro/astro/issues/4432
export const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  const { setMode } = useColorScheme();

  useEffect(() => {
    if (import.meta.env.SSR) {
      return;
    }

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleDarkModeChange = (event: { matches: boolean }) => {
      setMode(event.matches ? 'dark' : 'light');
    };

    darkModeQuery.addEventListener('change', handleDarkModeChange);

    // First changes
    handleDarkModeChange(darkModeQuery);

    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, [setMode]);

  return <>{children}</>;
};
