import { Open_Sans, JetBrains_Mono } from 'next/font/google';

export const fontOpenSans = Open_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '500', '700'],
  style: ['normal'],
  variable: '--font-open-sans',
});

export const fontJetBrainsMono = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--font-jet-brains-mono',
});
