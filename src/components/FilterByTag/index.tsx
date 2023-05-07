import { Tag } from '../Tag';
import styles from './index.module.css';

interface FilterByTagProps {
  tags: string[];
}

export const FilterByTag: React.FC<FilterByTagProps> = ({ tags }) => {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} allowFilter />
      ))}
    </ul>
  );
};
