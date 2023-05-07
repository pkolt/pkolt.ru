import type { Metadata } from 'next';
import { getPostDetail, getPostSlugs } from '@/api/posts';
import styles from './page.module.css';
import { Markdown } from '@/components/Markdown';
import { TagList } from '@/components/TagList';
import { PostDate } from '@/components/PostDate';

interface PageProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params: { slug } }: PageProps): Metadata => {
  const post = getPostDetail(slug);
  return { title: post.title, keywords: post.tags.join(', ') };
};

export const generateStaticParams = () => {
  const posts = getPostSlugs();
  return posts.map((slug) => ({ slug }));
};

const PostPage: React.FC<PageProps> = ({ params: { slug } }) => {
  const post = getPostDetail(slug);
  return (
    <main className={styles.container}>
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

export default PostPage;
