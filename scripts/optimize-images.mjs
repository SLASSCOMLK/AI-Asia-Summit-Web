/**
 * Image Optimization Script — Windows-safe version
 * Uses temp files to work around sharp's path issues on Windows.
 */

import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const optimizations = [
  {
    dir: path.join(ROOT, 'src', 'assets', 'images'),
    maxWidth: 1600,
    quality: 78,
    label: 'Gallery Images'
  },
  {
    dir: path.join(ROOT, 'public'),
    maxWidth: 800,
    quality: 82,
    label: 'Public Assets',
    filter: (f) => /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('sponsorship-proposal')
  }
];

async function optimizeImage(filePath, maxWidth, quality) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const originalStat = await stat(filePath);
  const originalSize = originalStat.size;

  if (originalSize < 100 * 1024) {
    return { file: path.basename(filePath), skipped: true, originalSize };
  }

  const image = sharp(filePath);
  const metadata = await image.metadata();

  let pipeline = sharp(filePath).rotate();

  if (metadata.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, {
      withoutEnlargement: true,
      fit: 'inside'
    });
  }

  if (ext === '.png') {
    pipeline = pipeline.png({ quality, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality, progressive: true, mozjpeg: true });
  }

  // Write to buffer first, then to a safe temp path, then rename
  const buffer = await pipeline.toBuffer();
  const newSize = buffer.length;

  if (newSize < originalSize) {
    const dir = path.dirname(filePath);
    const tempFile = path.join(dir, `_optimized_temp${ext}`);
    
    await sharp(buffer).toFile(tempFile);
    await unlink(filePath);
    await rename(tempFile, filePath);
    
    return {
      file: path.basename(filePath),
      originalSize,
      newSize,
      reduction: ((1 - newSize / originalSize) * 100).toFixed(1)
    };
  }

  return { file: path.basename(filePath), skipped: true, originalSize, reason: 'no improvement' };
}

async function processDirectory(config) {
  console.log(`\n📁 ${config.label}: ${config.dir}`);
  console.log('─'.repeat(60));

  let files;
  try {
    files = await readdir(config.dir);
  } catch {
    console.log('  ⚠️  Directory not found, skipping.');
    return;
  }

  if (config.filter) {
    files = files.filter(config.filter);
  } else {
    files = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  }

  let totalOriginal = 0;
  let totalNew = 0;

  for (const file of files) {
    const filePath = path.join(config.dir, file);
    try {
      const result = await optimizeImage(filePath, config.maxWidth, config.quality);
      if (!result) continue;

      if (result.skipped) {
        const kb = (result.originalSize / 1024).toFixed(0);
        console.log(`  ⏭️  ${result.file} (${kb} KB) — skipped${result.reason ? `: ${result.reason}` : ''}`);
        totalOriginal += result.originalSize;
        totalNew += result.originalSize;
      } else {
        const origKB = (result.originalSize / 1024).toFixed(0);
        const newKB = (result.newSize / 1024).toFixed(0);
        console.log(`  ✅ ${result.file}: ${origKB} KB → ${newKB} KB (−${result.reduction}%)`);
        totalOriginal += result.originalSize;
        totalNew += result.newSize;
      }
    } catch (err) {
      console.log(`  ❌ ${file}: ${err.message}`);
    }
  }

  if (totalOriginal > 0) {
    const totalOrigMB = (totalOriginal / (1024 * 1024)).toFixed(1);
    const totalNewMB = (totalNew / (1024 * 1024)).toFixed(1);
    const saved = (((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1);
    console.log(`\n  📊 Total: ${totalOrigMB} MB → ${totalNewMB} MB (saved ${saved}%)`);
  }
}

async function main() {
  console.log('🖼️  AI Asia Summit — Image Optimization (Windows-safe)');
  console.log('═'.repeat(60));

  for (const config of optimizations) {
    await processDirectory(config);
  }

  console.log('\n✨ Done!\n');
}

main().catch(console.error);
