// Génère les variantes des photos de public/images/hero et public/images/pages
// (voir src/lib/variants.mjs). Sans variante, le site affiche simplement la photo d'origine.
import fs from 'node:fs';
import path from 'node:path';
import { OUT_DIR, PHOTO_DIRS, WIDTHS, listPhotos, publicPath, variantRel } from '../src/lib/variants.mjs';

async function generate(logger) {
  const { default: sharp } = await import('sharp');
  const expected = new Set();
  let created = 0;

  for (const dir of PHOTO_DIRS) {
    for (const { name, rel } of listPhotos(dir)) {
      try {
        const buffer = fs.readFileSync(publicPath(rel));
        const { width } = await sharp(buffer).metadata();
        for (const w of WIDTHS.filter((w) => w < width)) {
          const out = publicPath(variantRel(dir, name, buffer, w));
          expected.add(out);
          if (fs.existsSync(out)) continue;
          fs.mkdirSync(path.dirname(out), { recursive: true });
          const data = await sharp(buffer).rotate().resize({ width: w }).webp({ quality: 78, effort: 6 }).toBuffer();
          fs.writeFileSync(out, data);
          created++;
        }
      } catch (e) {
        logger.warn(`${rel} : variantes non générées (${e.message})`);
      }
    }
  }

  // Retire les variantes des photos remplacées ou supprimées
  for (const dir of PHOTO_DIRS) {
    const abs = publicPath(`${OUT_DIR}/${dir}`);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      const file = path.join(abs, f);
      if (!expected.has(file)) fs.rmSync(file);
    }
  }
  if (created) logger.info(`${created} variantes de photos générées`);
}

export default function imageVariants() {
  return {
    name: 'butus-image-variants',
    hooks: {
      'astro:config:setup': async ({ command, logger }) => {
        if (command !== 'dev' && command !== 'build') return;
        try {
          await generate(logger);
        } catch (e) {
          logger.warn(`Variantes de photos non générées : ${e.message}`);
        }
      },
    },
  };
}
