import { PageUrl } from '@/constants/urls';
import cn from 'classnames';

import styles from './index.module.css';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.container}>
      <a className={styles.link} href={PageUrl.RadioElectronics}>
        <i className={cn('bi-boombox', styles.icon)}></i>
        Радиоэлектроника
      </a>
      {/* <a href={PageUrl.About} className={styles.link}>
        <i className={cn('bi-person', styles.icon)}></i>
        Обо мне
      </a> */}
    </nav>
  );
};
