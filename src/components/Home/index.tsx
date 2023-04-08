'use client';

import { useState } from 'react';
import { Post } from '../../types/post';
import { PostList } from '../PostList';
import { FilterByTag } from '../FilterByTag';
import styles from './index.module.css';

interface HomeProps {
  posts: Post[];
  tags: string[];
}

export const Home: React.FC<HomeProps> = ({ posts, tags }) => {
  const [selectedTag, onSelectTag] = useState<string>();
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterByTag tags={tags} selectedTag={selectedTag} onSelectTag={onSelectTag} />
      </aside>
      <main className={styles.main}>
        <PostList posts={posts} selectedTag={selectedTag} />
      </main>
    </div>
  );
};
