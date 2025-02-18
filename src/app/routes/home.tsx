import { FilterByTag } from '@/components/FilterByTag';
import { PostList } from '@/components/PostList';

import styles from './home.module.css';
import { getPosts, getTags } from '@/api/posts';
import type { Route } from './+types/home';
import { Seo } from '@/components/Seo';
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE, SITE_URL } from '@/constants/site';

export async function loader() {
  const posts = await getPosts();
  const tags = getTags(posts);
  return { posts, tags };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Seo title={SITE_TITLE} description={SITE_DESCRIPTION} keywords={SITE_KEYWORDS} url={SITE_URL} />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FilterByTag tags={loaderData.tags} />
        </aside>
        <main className={styles.main}>
          <PostList posts={loaderData.posts} />
        </main>
      </div>
    </>
  );
}
