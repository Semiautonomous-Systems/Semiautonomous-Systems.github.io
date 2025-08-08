import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://semiautonomous-systems.github.io',
  base: '/venom',
  integrations: [tailwind({ applyBaseStyles: false })],
  output: 'static'
});
