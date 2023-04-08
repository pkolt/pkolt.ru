import { DateTime } from 'luxon';
import CalendarIcon from 'public/images/calendar.svg';
import styles from './index.module.css';

interface PostDateProps {
  dateIso: string;
  showIcon?: boolean;
}

export const PostDate: React.FC<PostDateProps> = ({ dateIso, showIcon }) => {
  const fmtDate = DateTime.fromISO(dateIso).toFormat('dd.MM.yyyy');
  return (
    <time dateTime={dateIso} className={styles.container}>
      {showIcon && <CalendarIcon />}
      {fmtDate}
    </time>
  );
};
