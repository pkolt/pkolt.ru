import { usePostsFilterStore } from '@/store/postsFilter';
import { getColorFromString } from '@/utils/get-color-from-string';
import cn from 'classnames';
import { useCallback, type JSX } from 'react';

import styles from './index.module.css';

interface TagProps {
  asButton?: boolean;
  text: string;
}

export const Tag = ({ asButton, text }: TagProps): JSX.Element => {
  const color = getColorFromString(text);
  const { setTag, tag } = usePostsFilterStore();
  const selected = !!tag && text === tag;

  const handleClick = useCallback(() => {
    setTag(text);
  }, [setTag, text]);

  if (asButton) {
    return (
      <div
        className={cn(styles.container, selected && styles.selected, styles.button)}
        onClick={handleClick}
        onKeyUp={handleClick}
        tabIndex={0}
        role="button"
        style={{ '--color': color } as React.CSSProperties}>
        {text}
      </div>
    );
  }

  return (
    <div
      className={cn(styles.container, selected && styles.selected)}
      style={{ '--color': color } as React.CSSProperties}>
      {text}
    </div>
  );
};
