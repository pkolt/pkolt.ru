import type { Post, PostHeader, PostMatter } from '@/types/post';
import fs from 'node:fs';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { matter as vFileMatter } from 'vfile-matter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkHeadings from '@vcarl/remark-headings';
import remarkHeadingId from 'remark-heading-id';

const PROJ_DIR = path.join(import.meta.dirname, '..', '..'); // Fixed run from `build` dir
const POSTS_DIR = path.join(PROJ_DIR, 'data/blog');

async function getPostByFilePath(filePath: string): Promise<Post> {
  const content = fs.readFileSync(filePath);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHeadingId, { defaults: true })
    .use(remarkHeadings)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(() => (_, file) => vFileMatter(file)) // Converted matter string to JSON
    .process(content);

  const matter = (file.data.matter ?? {}) as unknown as PostMatter;
  const headings = (file.data.headings ?? []) as unknown as PostHeader[];
  const slug = path.basename(path.dirname(filePath));
  const url = `/blog/${slug}/`;
  const post = { matter, headings, url, content: file.value } as Post;
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
  const tags = posts.map((post) => post.matter.tags).flat();
  return Array.from(new Set(tags)).sort();
}
