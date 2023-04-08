import { Post } from '../../types/post';
import styles from './index.module.css';
import { Markdown } from '../Markdown';
import { TagList } from '../TagList';
import { PostDate } from '../PostDate';

interface PostDetailProps {
  post: Post;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.postInfo}>
          <PostDate dateIso={post.created} showIcon />
          <TagList tags={post.tags} />
        </div>
      </header>
      <Markdown>{post.content}</Markdown>
    </main>
  );
};
