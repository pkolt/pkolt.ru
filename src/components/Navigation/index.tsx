import styles from './index.module.css';
import cn from 'classnames';
import { PageUrl } from '@/constants/urls';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.container}>
      <a href={PageUrl.RadioAmateur} className={styles.link}>
        <i className={cn('bi-boombox', styles.icon)}></i>
        Радиолюбитель
      </a>
      {/* <a href={PageUrl.About} className={styles.link}>
        <i className={cn('bi-person', styles.icon)}></i>
        Обо мне
      </a> */}
    </nav>
  );
};
