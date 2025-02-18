import cn from 'classnames';
import { DateTime } from 'luxon';

import styles from './index.module.css';
import type { JSX } from 'react';

interface PostDateProps {
  className?: string;
  dateIso: string;
  showIcon?: boolean;
}

export const PostDate = ({ className, dateIso, showIcon }: PostDateProps): JSX.Element => {
  const fmtDate = DateTime.fromISO(dateIso).toFormat('dd.MM.yyyy');
  return (
    <time className={cn(styles.container, className)} dateTime={dateIso}>
      {showIcon && <i className={cn('bi-calendar', styles.icon)} />}
      {fmtDate}
    </time>
  );
};
