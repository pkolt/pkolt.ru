import LogoImage from 'public/images/logo.svg';
import styles from './index.module.css';

export const SiteLogo = () => {
  return (
    <div className={styles.container}>
      <LogoImage />
    </div>
  );
};
