import { Tag } from '@/components/Tag';
import styles from './index.module.css';

interface FilterByTagProps {
  tags: string[];
}

export const FilterByTag = ({ tags }: FilterByTagProps): JSX.Element => {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} allowFilter />
      ))}
    </ul>
  );
};
