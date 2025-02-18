import { getPosts } from '@/api/posts';
import { SITE_URL } from '@/constants/site';
import { DateTime } from 'luxon';
import { SitemapStream, streamToPromise, type SitemapItem, EnumChangefreq } from 'sitemap';
import { Readable } from 'node:stream';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type Link = Required<Pick<SitemapItem, 'url' | 'priority' | 'lastmod'> & { changefreq: `${EnumChangefreq}` }>;

async function main() {
  const links: Link[] = [{ url: SITE_URL, changefreq: 'daily', priority: 1, lastmod: DateTime.now().toISO() }];
  const posts = await getPosts();

  posts.forEach((post) => {
    links.push({ url: post.url, changefreq: 'daily', priority: 0.8, lastmod: post.matter.modified });
  });

  const stream = new SitemapStream({ hostname: SITE_URL });
  const buffer = await streamToPromise(Readable.from(links).pipe(stream));
  const content = buffer.toString();

  const publicDir = path.resolve(import.meta.dirname, '../../build/client');
  const sitemapFilePath = path.join(publicDir, 'sitemap.xml');

  mkdirSync(publicDir, { recursive: true });
  writeFileSync(sitemapFilePath, content);

  // eslint-disable-next-line no-console
  console.info(`Created sitemap: ${sitemapFilePath}`);
}

const isScript = import.meta.filename === process.argv[1];

if (isScript) {
  main().catch(console.error);
}
