import { useMemo } from 'react';
import { Post } from '../../types/post';
import { PostItem } from './PostItem';
import styles from './index.module.css';

interface PostListProps {
  posts: Post[];
  selectedTag?: string;
}

export const PostList: React.FC<PostListProps> = ({ posts, selectedTag }) => {
  const filteredPosts = useMemo(() => {
    if (selectedTag) {
      return posts.filter((post) => post.tags.includes(selectedTag));
    }
    return posts;
  }, [posts, selectedTag]);

  return (
    <section className={styles.container}>
      {filteredPosts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </section>
  );
};
