import styles from './index.module.css';
import { Page } from '@/constants';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.container}>
      <a href={Page.Home}>Home</a>
      <a href={Page.Electronics}>Electronics</a>
      <a href={Page.About}>About</a>
    </nav>
  );
};
