import { getPostList, getTags } from '@/api/posts';
import { PostList } from '@/components/PostList';
import { FilterByTag } from '@/components/FilterByTag';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  const posts = getPostList();
  const tags = getTags(posts);
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterByTag tags={tags} />
      </aside>
      <main className={styles.main}>
        <PostList posts={posts} />
      </main>
    </div>
  );
};

export default HomePage;
