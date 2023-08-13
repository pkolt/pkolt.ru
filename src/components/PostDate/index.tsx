import { DateTime } from 'luxon';
import cn from 'classnames';
import styles from './index.module.css';
import { Icon } from '@/components/Icon';

interface PostDateProps {
  dateIso: string;
  showIcon?: boolean;
  className?: string;
}

export const PostDate: React.FC<PostDateProps> = ({ dateIso, showIcon, className }) => {
  const fmtDate = DateTime.fromISO(dateIso).toFormat('dd.MM.yyyy');
  return (
    <time dateTime={dateIso} className={cn(styles.container, className)}>
      {showIcon && <Icon name="calendar" />}
      {fmtDate}
    </time>
  );
};
