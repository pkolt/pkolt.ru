import type { Post } from '@/types/post';

import { usePostsFilterStore } from '@/store/postsFilter';
import { DateTime } from 'luxon';
import { useMemo, type JSX } from 'react';

import styles from './index.module.css';
import { PostItem } from './PostItem';

const orderByDate = (posts: Post[]) => {
  return posts.sort((post1, post2) =>
    DateTime.fromISO(post1.matter.created) > DateTime.fromISO(post2.matter.created) ? -1 : 1,
  );
};

interface PostListProps {
  posts: Post[];
}

export const PostList = ({ posts }: PostListProps): JSX.Element => {
  const { tag } = usePostsFilterStore();

  const orderedPosts = useMemo(() => orderByDate(posts), [posts]);

  const filteredPosts = useMemo(() => {
    if (tag) {
      return orderedPosts.filter((post) => post.matter.tags.includes(tag));
    }
    return orderedPosts;
  }, [orderedPosts, tag]);

  return (
    <section className={styles.container}>
      {filteredPosts.map((post) => (
        <PostItem key={post.pathname} post={post} />
      ))}
    </section>
  );
};
