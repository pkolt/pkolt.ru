import { DateTime } from 'luxon';
import styles from './index.module.css';

export const Copyright: React.FC = () => {
  const year = DateTime.local().toFormat('yyyy');
  return <div className={styles.container}>&copy; 2015-{year}</div>;
};
