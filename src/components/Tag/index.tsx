import cn from 'classnames';
import { useMemo } from 'react';
import { getColorFromString } from '../../utils/getColorFromString';
import styles from './index.module.css';

interface TagProps {
  text: string;
  selected?: boolean;
  onSelect?: (tag?: string) => void;
}

export const Tag: React.FC<TagProps> = ({ text, selected = true, onSelect }) => {
  const color = getColorFromString(text);
  const handleSelect = useMemo(() => {
    if (onSelect) {
      return () => onSelect(selected ? undefined : text);
    }
  }, [onSelect, selected, text]);
  return (
    <li
      className={cn(styles.container, selected && styles.selected, !!handleSelect && styles.cursor)}
      style={{ background: color }}
      onClick={handleSelect}
      role="button">
      {text}
    </li>
  );
};
