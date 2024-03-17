import cn from 'classnames';
import { useState } from 'react';

import styles from './index.module.css';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface PostHeadingsProps {
  headings: Heading[];
}

export const PostHeadings = ({ headings }: PostHeadingsProps): JSX.Element | null => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded((state) => !state);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn(styles.container, expanded && styles.expanded)}>
      <div className={styles.title} onClick={handleClick} onKeyUp={handleClick} role="button" tabIndex={0}>
        Содержание
        <i className="bi-chevron-down" />
      </div>
      {expanded && (
        <ol>
          {headings.map((it) => (
            <li data-depth={it.depth} key={it.slug}>
              <a href={`#${it.slug}`}>{it.text}</a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
