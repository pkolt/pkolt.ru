import Link from 'next/link';
import { SiteLogo } from '../SiteLogo';
import styles from './index.module.css';

export const SiteName: React.FC = () => {
  return (
    <Link href="/" className={styles.container}>
      <SiteLogo width={50} height={50} />
      <h1 className={styles.name}>Developer Blog</h1>
      <p className={styles.description}>Pavel Koltyshev</p>
    </Link>
  );
};
