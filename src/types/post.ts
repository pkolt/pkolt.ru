import type { MarkdownInstance } from 'astro';

export interface PostMarkdown {
  created: string;
  modified: string;
  title: string;
  tags: string[];
  seo_description: string;
  seo_tags: string[];
}

export type Post = MarkdownInstance<PostMarkdown>;
