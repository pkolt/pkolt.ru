import { SITE_AUTHOR, SITE_TITLE } from '@/constants/site';
import type { JSX } from 'react';

interface Props {
  title: string;
  url: string;
  description: string;
  keywords: string[];
  createdAt?: string;
  modifiedAt?: string;
  noindex?: boolean;
}

export function Seo({ title, description, keywords, createdAt, modifiedAt, url, noindex }: Props): JSX.Element {
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="author" content={SITE_AUTHOR} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_TITLE} />
      {modifiedAt && <meta property="og:updated_time" content={modifiedAt} />}

      {createdAt && <meta property="article:published_time" content={createdAt} />}
      {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}
      <meta property="article:section" content={title} />
      {keywords && keywords.map((keyword) => <meta key={keyword} property="article:tag" content={keyword} />)}
    </>
  );
}
