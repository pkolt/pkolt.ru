import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Image } from 'mdast';
import { VFile } from 'vfile';
import fsPromises from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

const PROJ_DIR = path.resolve(import.meta.dirname, '..', '..');
const THUMBNAILS_BUILD_DIR = path.resolve(PROJ_DIR, 'build', 'client', 'images', 'thumbnails');
const THUMBNAILS_PUBLIC_DIR = path.resolve(PROJ_DIR, 'public', 'images', 'thumbnails');
const THUMBNAIL_URL = '/images/thumbnails/';
const THUMBNAIL_FORMAT = 'webp';
const THUMBNAIL_SIZE = 1024;

async function fileExists(filepath: string): Promise<boolean> {
  try {
    await fsPromises.access(filepath);
    return true;
  } catch {
    return false;
  }
}

async function generateMD5(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

async function makeThumbnail(markdownPath: string, imageSubpath: string): Promise<string> {
  const sourceDir = path.dirname(markdownPath);
  const imagePath = path.join(sourceDir, imageSubpath);
  const hash = await generateMD5(imagePath);
  const shortHash = hash.slice(0, 8);
  const ext = path.extname(imageSubpath);
  const name = path.basename(imageSubpath, ext);
  const thumbnailName = `${name}.${shortHash}.${THUMBNAIL_FORMAT}`;
  const thumbnailPath = path.join(THUMBNAILS_BUILD_DIR, thumbnailName);

  const isExistsThumbnail = await fileExists(thumbnailPath);
  if (!isExistsThumbnail) {
    await sharp(imagePath).resize(THUMBNAIL_SIZE).toFormat(THUMBNAIL_FORMAT).toFile(thumbnailPath);
  }

  return `${THUMBNAIL_URL}${thumbnailName}`;
}

export const remarkThumbnails: Plugin<[], Root> = () => {
  if (!fs.existsSync(THUMBNAILS_BUILD_DIR)) {
    fs.mkdirSync(THUMBNAILS_BUILD_DIR, { recursive: true });
  }

  if (!fs.existsSync(THUMBNAILS_PUBLIC_DIR)) {
    fs.symlinkSync(THUMBNAILS_BUILD_DIR, THUMBNAILS_PUBLIC_DIR, 'dir');
  }

  return async (tree, file: VFile) => {
    const promises: Promise<void>[] = [];

    visit(tree, 'image', (node: Image) => {
      if (node.url) {
        const promise = makeThumbnail(file.path, node.url).then((newUrl) => {
          node.url = newUrl;
        });
        promises.push(promise);
      }
    });

    await Promise.all(promises);
  };
};
