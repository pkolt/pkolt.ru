import type { Metadata } from 'next';
import Script from 'next/script';
import { Copyright } from '@/components/Copyright';
import { Navigation } from '@/components/Navigation';
import { SiteName } from '@/components/SiteName';
import { SocialNav } from '@/components/SocialNav';
import { fontOpenSans } from '@/fonts';
import '../styles/globals.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Developer Blog',
  description: 'Developer blog by Pavel Koltyshev',
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={fontOpenSans.className}>
      {process.env.NODE_ENV === 'production' && <Script src="/service-worker-register.js" type="module" async />}
      <body className={styles.container}>
        <header className={styles.header}>
          <SiteName />
          {/* <Navigation /> */}
          <SocialNav />
        </header>
        {children}
        <footer className={styles.footer}>
          <Copyright />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
