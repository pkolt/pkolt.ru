import type { Post, PostMeta } from '@/types/post';
import { glob, readFile } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import { matter } from 'vfile-matter';

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  const postsDir = path.join(import.meta.dirname, '../pages/blog');
  for await (const filename of glob('*.md', { cwd: postsDir })) {
    const filePath = path.join(postsDir, filename);

    const file = await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
      .use(() => (_, file) => matter(file))
      .process(await readFile(filePath));

    const meta = file.data.matter as unknown as PostMeta;
    const slug = path.parse(filename).name;
    const url = `/blog/${slug}/`;
    const post = { ...meta, url } as Post;
    posts.push(post);
  }
  return posts;
}

export function getTags(posts: Post[]): string[] {
  const tags = posts.map((post) => post.tags).flat();
  return Array.from(new Set(tags)).sort();
}
