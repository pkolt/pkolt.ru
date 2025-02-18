import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Image } from 'mdast';
import { VFile } from 'vfile';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const PROJ_DIR = path.resolve(import.meta.dirname, '..', '..');
const THUMBNAILS_DIR = path.resolve(PROJ_DIR, 'public', 'images', 'thumbnails');
const THUMBNAIL_URL = '/images/thumbnails/';
const THUMBNAIL_FORMAT = 'webp';
const THUMBNAIL_SIZE = 1024;

async function uploadImage(filepath: string, url: string): Promise<string> {
  const sourceDir = path.dirname(filepath);
  const imagePathname = path.join(sourceDir, url);
  const imageBuffer = fs.readFileSync(imagePathname);
  const hash = createHash('md5').update(imageBuffer).digest('hex');
  const shortHash = hash.slice(0, 8);
  const ext = path.extname(url);
  const name = path.basename(url, ext);
  const thumbnailName = `${name}.${shortHash}.${THUMBNAIL_FORMAT}`;
  const thumbnailFilepath = path.join(THUMBNAILS_DIR, thumbnailName);

  if (!fs.existsSync(thumbnailFilepath)) {
    const outputBuffer = await sharp(imageBuffer).resize(THUMBNAIL_SIZE).toFormat(THUMBNAIL_FORMAT).toBuffer();
    fs.writeFileSync(thumbnailFilepath, outputBuffer);
  }

  return `${THUMBNAIL_URL}${thumbnailName}`;
}

export const remarkTransformImages: Plugin<[], Root> = () => {
  if (!fs.existsSync(THUMBNAILS_DIR)) {
    fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
  }

  return async (tree, file: VFile) => {
    const promises: Promise<void>[] = [];

    visit(tree, 'image', (node: Image) => {
      if (node.url) {
        const promise = uploadImage(file.path, node.url).then((newUrl) => {
          node.url = newUrl;
        });
        promises.push(promise);
      }
    });

    await Promise.all(promises);
  };
};
