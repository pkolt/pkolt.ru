import type { Metadata } from 'next';
import { getPostDetail, getPostSlugs } from '../../api/posts';
import { PostDetail } from '../../components/PostDetail';

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
  return <PostDetail post={post} />;
};

export default PostPage;
