import { readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMAGE_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.gif'];

//! https://github.com/withastro/astro/issues/8143

const removeOriginImages = (directoryPath) => {
  try {
    const items = readdirSync(directoryPath, { recursive: true });

    for (const item of items) {
      const itemPath = join(directoryPath, item);
      const stats = statSync(itemPath);
      const fileExt = extname(itemPath).toLowerCase();
      if (stats.isFile() && IMAGE_EXTENSIONS.includes(fileExt)) {
        unlinkSync(itemPath);
        console.log(`Deleted: ${itemPath}`);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const scriptFilename = fileURLToPath(import.meta.url);
const baseDir = dirname(scriptFilename);
const outDir = join(baseDir, '../out/_astro');

removeOriginImages(outDir);
