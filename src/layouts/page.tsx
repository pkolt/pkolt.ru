import type { JSX } from 'react';
import styles from './page.module.css';
import { Outlet } from 'react-router';

export default function PageLayout(): JSX.Element {
  return (
    <main className={styles.container}>
      <Outlet />
    </main>
  );
}
