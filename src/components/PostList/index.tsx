'use client';
import { useMemo } from 'react';
import { Post } from '@/types/post';
import { PostItem } from './PostItem';
import styles from './index.module.css';
import { useFilterStore } from '@/store/filter';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { tag } = useFilterStore();
  const filteredPosts = useMemo(() => {
    if (tag) {
      return posts.filter((post) => post.tags.includes(tag));
    }
    return posts;
  }, [posts, tag]);

  return (
    <section className={styles.container}>
      {filteredPosts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </section>
  );
};
