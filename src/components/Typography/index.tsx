import styles from './index.module.css';

interface TypographyProps extends React.PropsWithChildren {}

export const Typography = ({ children }: TypographyProps): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};
