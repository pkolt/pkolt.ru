import type { MarkdownInstance } from 'astro';

export interface PostMarkdown {
  title: string;
  created: string;
  modified: string;
  tags: string[];
}

export type Post = MarkdownInstance<PostMarkdown>;
