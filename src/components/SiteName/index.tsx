import { SiteLogo } from '@/components/SiteLogo';

import styles from './index.module.css';

export const SiteName: React.FC = () => {
  return (
    <a className={styles.container} href="/">
      <SiteLogo className={styles.logo} />
      <h1 className={styles.name}>Developer Blog</h1>
      <p className={styles.description}>Pavel Koltyshev</p>
    </a>
  );
};
