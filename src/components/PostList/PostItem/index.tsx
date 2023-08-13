import type { Post } from '../../../types/post';
import { PostDate } from '../../PostDate';
import { TagList } from '../../TagList';
import styles from './index.module.css';

interface PostItemProps {
  post: Post;
}

export const PostItem = ({ post }: PostItemProps): JSX.Element => {
  return (
    <article>
      <a href={post.url} className={styles.container}>
        <h2 className={styles.title}>{post.frontmatter.title}</h2>
        <TagList tags={post.frontmatter.tags} className={styles.tagList} />
        <PostDate dateIso={post.frontmatter.created} className={styles.date} />
      </a>
    </article>
  );
};
