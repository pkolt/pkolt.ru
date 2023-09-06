import cn from 'classnames';
import { useCallback } from 'react';
import { getColorFromString } from '@/utils/get-color-from-string';
import styles from './index.module.css';
import { usePostsFilterStore } from '@/store/postsFilter';

interface TagProps {
  text: string;
  allowFilter?: boolean;
}

export const Tag = ({ text, allowFilter }: TagProps): JSX.Element => {
  const color = getColorFromString(text);
  const { tag, setTag } = usePostsFilterStore();
  const selected = text === tag;
  const handleSelect = useCallback(() => {
    if (allowFilter) {
      setTag(text);
    }
  }, [allowFilter, setTag, text]);
  return (
    <li
      className={cn(styles.container, (selected || !allowFilter) && styles.selected, allowFilter && styles.cursor)}
      style={{ background: color }}
      onClick={handleSelect}
      role="button">
      {text}
    </li>
  );
};
