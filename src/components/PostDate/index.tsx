import { DateTime } from 'luxon';
import cn from 'classnames';
import styles from './index.module.css';

interface PostDateProps {
  dateIso: string;
  showIcon?: boolean;
  className?: string;
}

export const PostDate = ({ dateIso, showIcon, className }: PostDateProps): JSX.Element => {
  const fmtDate = DateTime.fromISO(dateIso).toFormat('dd.MM.yyyy');
  return (
    <time dateTime={dateIso} className={cn(styles.container, className)}>
      {showIcon && <i className={cn('bi-calendar', styles.icon)} />}
      {fmtDate}
    </time>
  );
};
