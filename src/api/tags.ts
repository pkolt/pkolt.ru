import type { Post } from '@/types/post';

export const getTags = (posts: Post[]): string[] => {
  const tags = posts.map((post) => post.frontmatter.tags).flat();
  return Array.from(new Set(tags)).sort();
};
