import type { Post, PostMeta } from '@/types/post';
import { glob, readFile } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import { matter } from 'vfile-matter';

const PROJ_DIR = path.join(import.meta.dirname, '..', '..'); // Fixed run from `build` dir
const POSTS_DIR = path.join(PROJ_DIR, 'src/pages/blog');

async function getPostByFilePath(filePath: string): Promise<Post> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(() => (_, file) => matter(file))
    .process(await readFile(filePath));

  const meta = file.data.matter as unknown as PostMeta;
  const filename = path.basename(filePath);
  const slug = path.parse(filename).name;
  const url = `/blog/${slug}/`;
  const post = { ...meta, url } as Post;
  return post;
}

export function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  return getPostByFilePath(filePath);
}

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  for await (const filename of glob('*.md', { cwd: POSTS_DIR })) {
    const filePath = path.join(POSTS_DIR, filename);
    const post = await getPostByFilePath(filePath);
    posts.push(post);
  }
  return posts;
}

export function getTags(posts: Post[]): string[] {
  const tags = posts.map((post) => post.tags).flat();
  return Array.from(new Set(tags)).sort();
}
