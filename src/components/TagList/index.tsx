import cn from 'classnames';
import { Tag } from '@/components/Tag';
import styles from './index.module.css';

interface TagListProps {
  tags: string[];
  className?: string;
}

export const TagList = ({ tags, className }: TagListProps): JSX.Element => {
  return (
    <ul className={cn(styles.tagList, className)}>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </ul>
  );
};
