import type { Metadata } from 'next';
import Script from 'next/script';
import { Copyright } from '@/components/Copyright';
import { Navigation } from '@/components/Navigation';
import { SiteName } from '@/components/SiteName';
import { SocialNav } from '@/components/SocialNav';
import { fontOpenSans } from '@/fonts';
import '../styles/globals.css';
import styles from './layout.module.css';
import { UpdatePwaDialog } from '@/components/UpdatePwaDialog';
import { SITE_TITLE, SITE_DESCRIPTION, APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  manifest: '/app.webmanifest',
  applicationName: APP_NAME,
  authors: [{ name: 'Pavel Koltyshev' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  robots: { index: true, follow: true },
  icons: { icon: '/images/icons/favicon.png' },
  other: {
    'mobile-web-app-capable': 'yes', // Allow web app to be run in full-screen mode - Android.
  },
  appleWebApp: {
    capable: true, // Allow web app to be run in full-screen mode - iOS.
    title: APP_NAME,
    statusBarStyle: 'default',
    startupImage: [
      {
        url: '/images/pwa/splash/apple-splash-2048-2732.jpg',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1668-2388.jpg',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1536-2048.jpg',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1668-2224.jpg',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1620-2160.jpg',
        media:
          '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1290-2796.jpg',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1179-2556.jpg',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1284-2778.jpg',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1170-2532.jpg',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1125-2436.jpg',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1242-2688.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-828-1792.jpg',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-1242-2208.jpg',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-750-1334.jpg',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url: '/images/pwa/splash/apple-splash-640-1136.jpg',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={fontOpenSans.className}>
      {process.env.NODE_ENV === 'production' && (
        <Script strategy="lazyOnload" src="/service-worker-register.js" type="module" async />
      )}
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
        <UpdatePwaDialog />
      </body>
    </html>
  );
};

export default RootLayout;
