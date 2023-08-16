import styles from './index.module.css';
import { Url } from '@/constants/urls';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.container}>
      <a href={Url.Home}>Home</a>
      <a href={Url.Electronics}>Electronics</a>
      <a href={Url.About}>About</a>
    </nav>
  );
};
