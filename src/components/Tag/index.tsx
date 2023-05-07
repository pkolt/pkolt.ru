'use client';
import cn from 'classnames';
import { useCallback } from 'react';
import { getColorFromString } from '../../utils/getColorFromString';
import styles from './index.module.css';
import { useFilterStore } from '../../store/filter';

interface TagProps {
  text: string;
  allowFilter?: boolean;
}

export const Tag: React.FC<TagProps> = ({ text, allowFilter }) => {
  const color = getColorFromString(text);
  const { tag, setTag } = useFilterStore();
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
