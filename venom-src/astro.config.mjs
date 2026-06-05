import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://semiautonomous.systems',
  base: '/',
  integrations: [
    sitemap(),
  ],
  output: 'static'
});
