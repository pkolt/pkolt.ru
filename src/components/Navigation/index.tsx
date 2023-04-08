import Link from 'next/link';
import styles from './index.module.css';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.container}>
      <Link href="/">Blog</Link>
      <Link href="/microelectronics">Microelectronics</Link>
      <Link href="/about">About</Link>
    </nav>
  );
};
