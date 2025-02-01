import type { Post, PostMeta } from '@/types/post';
import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import { matter } from 'vfile-matter';

const PROJ_DIR = path.join(import.meta.dirname, '..', '..'); // Fixed run from `build` dir
const POSTS_DIR = path.join(PROJ_DIR, 'data/blog');

async function getPostByFilePath(filePath: string): Promise<Post> {
  const content = fs.readFileSync(filePath);

  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(() => (_, file) => matter(file))
    .process(content);

  const meta = file.data.matter as unknown as PostMeta;
  const slug = path.basename(path.dirname(filePath));
  const url = `/blog/${slug}/`;
  const post = { ...meta, url } as Post;
  return post;
}

export function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, slug, 'index.md');
  return getPostByFilePath(filePath);
}

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];

  const dirs = fs.readdirSync(POSTS_DIR);
  for (const postDir of dirs) {
    const postFilePath = path.join(POSTS_DIR, postDir, 'index.md');
    if (fs.existsSync(postFilePath)) {
      const post = await getPostByFilePath(postFilePath);
      posts.push(post);
    }
  }
  return posts;
}

export function getTags(posts: Post[]): string[] {
  const tags = posts.map((post) => post.tags).flat();
  return Array.from(new Set(tags)).sort();
}
