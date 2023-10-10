import { Tag } from '@/components/Tag';

import styles from './index.module.css';

interface FilterByTagProps {
  tags: string[];
}

export const FilterByTag = ({ tags }: FilterByTagProps): JSX.Element => {
  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <Tag asButton key={tag} text={tag} />
      ))}
    </div>
  );
};
