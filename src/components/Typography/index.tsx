import cn from 'classnames';

import styles from './index.module.css';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({ children, className }: TypographyProps): JSX.Element => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};
