import { useMemo } from 'react';
import type { Post } from '@/types/post';
import { PostItem } from './PostItem';
import styles from './index.module.css';
import { useFilterStore } from '@/store/filter';
import { DateTime } from 'luxon';

const orderByDate = (posts: Post[]) => {
  return posts.sort((post1, post2) =>
    DateTime.fromISO(post1.frontmatter.created) > DateTime.fromISO(post2.frontmatter.created) ? -1 : 1,
  );
};

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps): JSX.Element => {
  const { tag } = useFilterStore();

  const orderedPosts = useMemo(() => orderByDate(posts), [posts]);

  const filteredPosts = useMemo(() => {
    if (tag) {
      return orderedPosts.filter((post) => post.frontmatter.tags.includes(tag));
    }
    return orderedPosts;
  }, [orderedPosts, tag]);

  return (
    <section className={styles.container}>
      {filteredPosts.map((post) => (
        <PostItem key={post.url} post={post} />
      ))}
    </section>
  );
};
