import { getPostBySlug } from '@/api/posts';
import type { Route } from './+types/post';
import styles from './post.module.css';
import { PostDate } from '@/components/PostDate';
import { TagList } from '@/components/TagList';
import { Typography } from '@/components/Typography';
import { PostHeadings } from '@/components/PostHeadings';
import { Seo } from '@/components/Seo';

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostBySlug(params.slug);
  return { post };
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  return (
    <>
      <Seo
        title={post.matter.title}
        description={post.matter.seo_description}
        keywords={post.matter.seo_tags}
        createdAt={post.matter.created}
        modifiedAt={post.matter.modified}
        url={post.url}
      />
      <header className={styles.header}>
        <h1 className={styles.title}>{post.matter.title}</h1>
        <div className={styles.postInfo}>
          <PostDate dateIso={post.matter.created} showIcon />
          <TagList tags={post.matter.tags} />
        </div>
        <PostHeadings headings={post.headings} />
      </header>
      <Typography>
        <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </Typography>
    </>
  );
}
