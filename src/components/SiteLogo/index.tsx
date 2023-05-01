import LogoImage from 'public/images/logo.svg';
import styles from './index.module.css';

interface SiteLogoProps {
  width: number;
  height: number;
}

export const SiteLogo: React.FC<SiteLogoProps> = ({ width, height }) => {
  return (
    <div className={styles.container} style={{ width: `${width}px`, height: `${height}px` }}>
      <LogoImage width={width} height={height} alt="Site logo" />
    </div>
  );
};
