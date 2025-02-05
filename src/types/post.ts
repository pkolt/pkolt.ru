export interface PostMatter {
  created: string;
  modified: string;
  title: string;
  tags: string[];
  seo_description: string;
  seo_tags: string[];
}

export interface PostHeader {
  depth: number;
  value: string;
  data: { id: string };
}

export interface Post {
  matter: PostMatter;
  headings: PostHeader[];
  url: string;
  content: string;
}
