/* eslint-disable @next/next/no-img-element */
import { CSSClassProps } from '@/types/components';
import styles from './index.module.css';
import cn from 'classnames';

export const SiteLogo: React.FC<CSSClassProps> = ({ className }) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.image}>
        <picture>
          <source srcSet="/images/images/logo@1x.png 1x, /images/images/logo@2x.png 2x" type="image/png" />
          <img src="/images/images/logo@1x.png" width="32px" height="50px" alt="Site logo" />
        </picture>
      </div>
    </div>
  );
};
