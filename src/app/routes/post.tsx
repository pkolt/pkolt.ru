import { getPostBySlug } from '@/api/posts';
import type { Route } from './+types/post';
import styles from './post.module.css';
import { PostDate } from '@/components/PostDate';
import { TagList } from '@/components/TagList';
// import { PostHeadings } from '@/components/PostHeadings';
// import { Typography } from '@/components/Typography';

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlug(params.slug);
  return { post };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.postInfo}>
          <PostDate dateIso={post.created} showIcon />
          <TagList tags={post.tags} />
        </div>
        {/* <PostHeadings headings={post.headings} /> */}
      </header>
      {/* <Typography></Typography> */}
    </>
  );
}
