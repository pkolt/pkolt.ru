import { Tag } from '@/components/Tag';
import cn from 'classnames';

import styles from './index.module.css';
import type { JSX } from 'react';

interface TagListProps {
  className?: string;
  tags: string[];
}

export const TagList = ({ className, tags }: TagListProps): JSX.Element => {
  return (
    <div className={cn(styles.tagList, className)}>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  );
};
