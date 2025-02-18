import type { Post, PostHeader, PostMatter } from '@/types/post';
import fs from 'node:fs';
import path from 'node:path';
import { unified, type Transformer } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { matter as vFileMatter } from 'vfile-matter';
import { VFile } from 'vfile';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkHeadings from '@vcarl/remark-headings';
import remarkHeadingId from 'remark-heading-id';
import remarkPrism from 'remark-prism';
import remarkStringify from 'remark-stringify';
import { SITE_URL } from '../constants/site';
import { remarkThumbnails } from '../utils/remark-thumbnails';

type RemarkPrism = (...args: Parameters<typeof remarkPrism>) => Transformer; // Fixed legacy plugin

const PROJ_DIR = path.join(import.meta.dirname, '..', '..'); // Fixed run from `build` dir
const POSTS_DIR = path.join(PROJ_DIR, 'data/blog');

interface PostOptions {
  parseContent?: boolean;
}

async function getPostByFilePath(filePath: string, options: PostOptions = {}): Promise<Post> {
  const content = fs.readFileSync(filePath);

  const processor = unified();
  processor.use(remarkParse);

  if (options.parseContent) {
    processor
      .use(remarkGfm)
      .use(remarkPrism as RemarkPrism)
      .use(remarkThumbnails)
      .use(remarkHeadingId, { defaults: true })
      .use(remarkHeadings)
      .use(remarkRehype)
      .use(rehypeStringify);
  } else {
    processor.use(remarkStringify);
  }

  processor
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' }) // Parsed matter
    .use(() => (_, file) => vFileMatter(file)); // Converted matter string to JSON

  const file = new VFile({ path: filePath, value: content });
  const result = await processor.process(file);
  const matter = (result.data.matter ?? {}) as unknown as PostMatter;
  const headings = (result.data.headings ?? []) as unknown as PostHeader[];
  const slug = path.basename(path.dirname(filePath));
  const pathname = `/blog/${slug}/`;
  const url = new URL(pathname, SITE_URL).toString();
  const post: Post = { matter, headings, url, pathname, content: String(result.value) };
  return post;
}

export function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, slug, 'index.md');
  return getPostByFilePath(filePath, { parseContent: true });
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
