import cn from 'classnames';

import styles from './index.module.css';
import type { JSX } from 'react';

interface SiteLogoProps {
  className?: string;
}

export const SiteLogo = ({ className }: SiteLogoProps): JSX.Element => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.image}>
        <picture>
          <source srcSet="/images/images/logo@1x.png 1x, /images/images/logo@2x.png 2x" type="image/png" />
          <img alt="Site logo" height="50px" src="/images/images/logo@1x.png" width="32px" />
        </picture>
      </div>
    </div>
  );
};
