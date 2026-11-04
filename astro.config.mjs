// @ts-check
import { defineConfig } from 'astro/config';

// Statický výstup (složka dist/) – nahrává se na běžný webhosting přes FTP.
// `site` se nastaví na doménu klienta, až ji budeme znát (potřeba pro sitemap a kanonické URL).
export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
