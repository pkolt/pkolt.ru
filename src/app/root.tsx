import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import styles from './root.module.css';
import { SiteName } from '@/components/SiteName';
import { Navigation } from '@/components/Navigation';
import { MenuButton } from '@/components/MenuButton';
import { SocialNav } from '@/components/SocialNav';
import { Copyright } from '@/components/Copyright';
import prismOneDarkUrl from 'prism-themes/themes/prism-one-dark.css?url';
import prismOneLightUrl from 'prism-themes/themes/prism-one-light.css?url';
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/constants/site';
import '@/styles/globals.css';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/open-sans';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const links: Route.LinksFunction = () => [
  {
    rel: 'canonical',
    href: SITE_URL,
  },
  {
    rel: 'sitemap',
    href: '/sitemap-index.xml',
  },
  {
    rel: 'stylesheet',
    media: '(prefers-color-scheme: light)',
    href: prismOneLightUrl,
  },
  {
    rel: 'stylesheet',
    media: '(prefers-color-scheme: dark)',
    href: prismOneDarkUrl,
  },
  {
    rel: 'icon',
    href: '/images/icons/favicon.png',
  },
];

export const meta: Route.MetaFunction = () => {
  return [
    { charSet: 'utf-8' },
    { title: SITE_TITLE },
    { name: 'description', content: SITE_DESCRIPTION },
    { property: 'og:locale', content: 'ru_RU' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: SITE_TITLE },
    { property: 'og:description', content: SITE_DESCRIPTION },
    // {property: 'og:url', content: 'url to article'},
    { property: 'og:site_name', content: SITE_TITLE },
    // { property: 'og:updated_time', content: modifiedAt },
    // { property: 'article:published_time', content: createdAt },
    // { property: 'article:modified_time', content: modifiedAt },
    { property: 'article:section', content: SITE_TITLE },
    // {property: 'article:tag', content: keyword},
    { name: 'author', content: SITE_AUTHOR },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'index, follow' },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Google tag (gtag.js) */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-E2F75QK070"></script> */}
        {/* <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-E2F75QK070');
    </script> */}

        {process.env.NODE_ENV === 'production' && <script async src="/service-worker-register.js" type="module" />}
        <Meta />
        <Links />
      </head>
      <body className={styles.container}>
        <header className={styles.header}>
          <SiteName />
          <div className={styles.navigation}>
            <Navigation />
          </div>
          <div className={styles['icons-mobile']}>
            <MenuButton />
          </div>
          <div className={styles['icons-desktop']}>
            <SocialNav />
          </div>
        </header>
        {children}

        <footer className={styles.footer}>
          <Copyright />
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
