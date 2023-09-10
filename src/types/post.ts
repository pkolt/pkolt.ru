import type { MarkdownInstance } from 'astro';

export interface PostMarkdown {
  created: string;
  modified: string;
  tags: string[];
  title: string;
}

export type Post = MarkdownInstance<PostMarkdown>;
