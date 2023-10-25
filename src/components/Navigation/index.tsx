import { PageUrl } from '@/constants/urls';
import cn from 'classnames';

import styles from './index.module.css';
import { wrapUrl } from '@/utils/seo';

export const Navigation: React.FC = () => {
  return (
    <nav className={styles.container}>
      <a className={styles.link} href={wrapUrl(PageUrl.RadioElectronics)}>
        <i className={cn('bi-boombox', styles.icon)}></i>
        Радиоэлектроника
      </a>
    </nav>
  );
};
