import { wrapUrl } from '@/utils/seo';
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
      <a className={styles.container} href={wrapUrl(post.url as string)}>
        <h2 className={styles.title}>{post.frontmatter.title}</h2>
        <TagList className={styles.tagList} tags={post.frontmatter.tags} />
        <PostDate className={styles.date} dateIso={post.frontmatter.created} />
      </a>
    </article>
  );
};
