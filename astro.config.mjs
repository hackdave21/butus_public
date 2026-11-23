import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://butus.org',
  output: 'static',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
