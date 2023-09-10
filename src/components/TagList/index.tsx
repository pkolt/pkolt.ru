import { Tag } from '@/components/Tag';
import cn from 'classnames';

import styles from './index.module.css';

interface TagListProps {
  className?: string;
  tags: string[];
}

export const TagList = ({ className, tags }: TagListProps): JSX.Element => {
  return (
    <ul className={cn(styles.tagList, className)}>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </ul>
  );
};
