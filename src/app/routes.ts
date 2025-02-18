import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  layout('../layouts/page.tsx', [route('blog/:slug', 'routes/post.tsx'), route('404', 'routes/404.tsx')]),
] satisfies RouteConfig;
