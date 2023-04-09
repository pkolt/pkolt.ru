import Link from 'next/link';
import { Post } from '../../../types/post';
import { PostDate } from '../../PostDate';
import { TagList } from '../../TagList';
import styles from './index.module.css';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <article>
      <Link prefetch={false} href={`/${post.slug}`} className={styles.container}>
        <h2 className={styles.title}>{post.title}</h2>
        <TagList tags={post.tags} className={styles.tagList} />
        <PostDate dateIso={post.created} className={styles.date} />
      </Link>
    </article>
  );
};
