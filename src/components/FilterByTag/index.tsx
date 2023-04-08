import { Tag } from '../Tag';
import styles from './index.module.css';

interface FilterByTagProps {
  selectedTag?: string;
  onSelectTag: (tag?: string) => void;
  tags: string[];
}

export const FilterByTag: React.FC<FilterByTagProps> = ({ tags, selectedTag, onSelectTag }) => {
  return (
    <ul className={styles.container}>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} selected={tag === selectedTag} onSelect={onSelectTag} />
      ))}
    </ul>
  );
};
