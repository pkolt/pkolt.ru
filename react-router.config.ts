import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src/app',
  async prerender() {
    const urls = ['/'];
    if (import.meta.env.SSR) {
      const { getPosts } = await import('./src/api/posts');
      const posts = await getPosts();
      posts.forEach((post) => {
        urls.push(post.pathname);
      });
    }
    return urls;
  },
} satisfies Config;
