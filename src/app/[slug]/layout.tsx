import styles from './layout.module.css';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default MainLayout;
