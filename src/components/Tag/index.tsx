import { usePostsFilterStore } from '@/store/postsFilter';
import { getColorFromString } from '@/utils/get-color-from-string';
import cn from 'classnames';
import { useCallback } from 'react';

import styles from './index.module.css';

interface TagProps {
  allowFilter?: boolean;
  text: string;
}

export const Tag = ({ allowFilter, text }: TagProps): JSX.Element => {
  const color = getColorFromString(text);
  const { setTag, tag } = usePostsFilterStore();
  const selected = text === tag;
  const handleSelect = useCallback(() => {
    if (allowFilter) {
      setTag(text);
    }
  }, [allowFilter, setTag, text]);
  return (
    <li
      className={cn(styles.container, (selected || !allowFilter) && styles.selected, allowFilter && styles.cursor)}
      onClick={handleSelect}
      role="button"
      style={{ background: color }}>
      {text}
    </li>
  );
};
