import fs from 'node:fs';
import path from 'node:path';

const EXTS = ['webp', 'avif', 'jpg', 'jpeg', 'png'];

/** Renvoie l'URL publique de l'image `public/images/<dir>/<name>.<ext>` si elle existe, sinon null.
 *  Permet d'afficher un visuel de remplacement tant que la photo n'est pas générée. */
export function findImage(dir: string, name: string): string | null {
  for (const ext of EXTS) {
    const rel = `images/${dir}/${name}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return `/${rel}`;
  }
  return null;
}
