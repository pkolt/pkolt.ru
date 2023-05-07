import { getPostList, getTags } from '../api/posts';
import { Home } from '../pages/Home';

const HomePage: React.FC = () => {
  const posts = getPostList();
  const tags = getTags(posts);
  return <Home posts={posts} tags={tags} />;
};

export default HomePage;
