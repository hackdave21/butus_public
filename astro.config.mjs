import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import imageVariants from './integrations/image-variants.mjs';

export default defineConfig({
  site: 'https://butus.org',
  output: 'static',
  integrations: [imageVariants(), sitemap()],
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
