import fs from 'fs';
import path from 'path';
import { DateTime } from 'luxon';
import matter from 'gray-matter';
import { Post } from '@/types/post';

const isExistFile = (filePath: string): boolean => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
  } catch (err) {
    return false;
  }
  return true;
};

const postsDirectory = path.resolve('content', 'posts');
const patternMarkdown = /\.md$/;

export const getPostSlugs = (): string[] => {
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => patternMarkdown.test(name))
    .map((name) => name.replace(patternMarkdown, ''));
};

const getPostBySlug = (slug: string, opts: { content?: boolean } = {}): Post | null => {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!isExistFile(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const created = DateTime.fromJSDate(data.created).toISO();
  const modified = DateTime.fromJSDate(data.modified).toISO();
  if (!created) {
    throw new Error('Not found field `created` in Post.');
  }
  if (!modified) {
    throw new Error('Not found field `modified` in Post.');
  }
  return {
    title: data.title,
    slug,
    created,
    modified,
    tags: data.tags,
    content: opts.content ? content : undefined,
  };
};

export const getPostList = (): Post[] => {
  const posts: Post[] = [];
  const slugs = getPostSlugs();
  slugs.forEach((slug) => {
    const post = getPostBySlug(slug);
    if (post) {
      posts.push(post);
    }
  });
  const orderedPosts = posts.sort((post1, post2) =>
    DateTime.fromISO(post1.created) > DateTime.fromISO(post2.created) ? -1 : 1,
  );
  return orderedPosts;
};

export const getPostDetail = (slug: string) => {
  return getPostBySlug(slug, { content: true });
};

export const getTags = (posts: Post[]): string[] => {
  const tags = posts.map((post) => post.tags).flat();
  return Array.from(new Set(tags)).sort();
};
