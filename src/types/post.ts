export interface PostMeta {
  created: string;
  modified: string;
  title: string;
  tags: string[];
  seo_description: string;
  seo_tags: string[];
}

export interface Post extends PostMeta {
  url: string;
  content: string;
}
