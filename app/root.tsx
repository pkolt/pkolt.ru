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
import { SITE_AUTHOR } from '@/constants/site';
import '@/styles/globals.css';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/open-sans';
import 'bootstrap-icons/font/bootstrap-icons.css';

// export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* <title>{title}</title> */}
        {/* {description && <meta name="description" content={description} />} */}
        {/* {keywords && <meta name="keywords" content={keywords.join(', ')} />} */}
        {/* <link rel="canonical" href={Astro.url} /> */}
        {/* {noindex && <meta name="robots" content="noindex, nofollow" />} */}

        {/* <meta property="og:locale" content="en_US" /> */}
        <meta property="og:type" content="article" />
        {/* <meta property="og:title" content={title} /> */}
        {/* {description && <meta property="og:description" content={description} />} */}
        {/* <meta property="og:image" content="LINK TO THE IMAGE FILE" /> */}
        {/* <meta property="og:url" content={Astro.url} /> */}
        {/* <meta property="og:site_name" content={SITE_TITLE} /> */}
        {/* {modifiedAt && <meta property="og:updated_time" content={modifiedAt} />} */}

        {/* {createdAt && <meta property="article:published_time" content={createdAt} />} */}
        {/* {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />} */}
        {/* <meta property="article:section" content={title} /> */}
        {/* {keywords && keywords.map((keyword) => <meta property="article:tag" content={keyword} />)} */}
        <meta name="author" content={SITE_AUTHOR} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link href="/sitemap-index.xml" rel="sitemap" />
        <link href={prismOneLightUrl} media="(prefers-color-scheme: light)" rel="stylesheet" />
        <link href={prismOneDarkUrl} media="(prefers-color-scheme: dark)" rel="stylesheet" />

        <link href="/images/icons/favicon.png" rel="icon" />

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
