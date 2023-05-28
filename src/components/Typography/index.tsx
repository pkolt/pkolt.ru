import styles from './index.module.css';

export const Typography: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
