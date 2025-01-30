import cn from 'classnames';

import styles from './index.module.css';
import type { JSX } from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({ children, className }: TypographyProps): JSX.Element => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
