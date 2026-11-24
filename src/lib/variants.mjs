// Variantes des photos (largeurs réduites, en WebP) : règles partagées entre la génération
// (integrations/image-variants.mjs) et les pages (src/lib/images.ts).
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

export const PHOTO_DIRS = ['hero', 'pages'];
export const PHOTO_EXTS = ['webp', 'avif', 'jpg', 'jpeg', 'png'];
export const WIDTHS = [480, 640, 800, 1200];
/** Dossier généré au lancement de `dev` et de `build`, ignoré par git. */
export const OUT_DIR = 'images/_variantes';

export const publicPath = (rel) => path.join(process.cwd(), 'public', rel);

/** Chemin (relatif à public/) d'une variante. L'empreinte de la photo est dans le nom :
 *  remplacer une photo change l'adresse, donc jamais d'ancienne version en cache. */
export function variantRel(dir, name, buffer, width) {
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0, 8);
  return `${OUT_DIR}/${dir}/${name}-${hash}-${width}.webp`;
}

/** Photos présentes dans un dossier : une par nom, selon l'ordre de PHOTO_EXTS. */
export function listPhotos(dir) {
  const abs = publicPath(`images/${dir}`);
  if (!fs.existsSync(abs)) return [];
  const files = fs.readdirSync(abs);
  const names = new Set(files.filter((f) => PHOTO_EXTS.includes(path.extname(f).slice(1))).map((f) => path.parse(f).name));
  return [...names].map((name) => ({ name, rel: findPhotoRel(dir, name) }));
}

/** Chemin (relatif à public/) de la photo, ou null si elle n'existe pas encore. */
export function findPhotoRel(dir, name) {
  for (const ext of PHOTO_EXTS) {
    const rel = `images/${dir}/${name}.${ext}`;
    if (fs.existsSync(publicPath(rel))) return rel;
  }
  return null;
}
