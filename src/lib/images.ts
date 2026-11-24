import fs from 'node:fs';
import { WIDTHS, findPhotoRel, publicPath, variantRel } from './variants.mjs';

/** Renvoie l'URL publique de l'image `public/images/<dir>/<name>.<ext>` si elle existe, sinon null.
 *  Permet d'afficher un visuel de remplacement tant que la photo n'est pas générée. */
export function findImage(dir: string, name: string): string | null {
  const rel = findPhotoRel(dir, name);
  return rel && `/${rel}`;
}

/** Photo et ses variantes déjà générées (voir integrations/image-variants.mjs), ou null si la photo manque.
 *  Sans variante, `srcset` est indéfini et la photo d'origine est utilisée. */
export async function findPhoto(dir: string, name: string) {
  const rel = findPhotoRel(dir, name);
  if (!rel) return null;
  const buffer = fs.readFileSync(publicPath(rel));
  const src = `/${rel}`;
  const entries = WIDTHS.map((w) => ({ w, rel: variantRel(dir, name, buffer, w) })).filter((v) => fs.existsSync(publicPath(v.rel)));
  if (!entries.length) return { src, srcset: undefined };
  try {
    const { default: sharp } = await import('sharp');
    const { width } = await sharp(buffer).metadata();
    return { src, srcset: [...entries.map((v) => `/${v.rel} ${v.w}w`), `${src} ${width}w`].join(', ') };
  } catch {
    return { src, srcset: undefined };
  }
}
