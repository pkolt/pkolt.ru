import type { Config } from '@react-router/dev/config';
import { getPosts } from './src/api/posts';

export default {
  appDirectory: 'src/app',
  async prerender() {
    const urls = ['/'];
    const posts = await getPosts();
    posts.forEach((post) => {
      urls.push(post.pathname);
    });
    return urls;
  },
} satisfies Config;
