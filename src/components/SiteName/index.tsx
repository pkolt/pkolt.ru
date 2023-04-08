import Link from 'next/link';
import LogoImage from 'public/images/logo.svg';
import styles from './index.module.css';

export const SiteName: React.FC = () => {
  return (
    <Link href="/" className={styles.container}>
      <div className={styles.logo}>
        <LogoImage />
      </div>
      <h1 className={styles.name}>Developer Blog</h1>
      <p className={styles.description}>Pavel Koltyshev</p>
    </Link>
  );
};
