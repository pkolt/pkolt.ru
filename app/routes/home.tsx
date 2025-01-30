import { FilterByTag } from '@/components/FilterByTag';
import { PostList } from '@/components/PostList';

import styles from './home.module.css';
import { getPosts, getTags } from '@/api/posts';
import type { Route } from './+types/home';

export async function loader() {
  const posts = await getPosts();
  const tags = getTags(posts);
  return { posts, tags };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterByTag tags={loaderData.tags} />
      </aside>
      <main className={styles.main}>
        <PostList posts={loaderData.posts} />
      </main>
    </div>
  );
}
