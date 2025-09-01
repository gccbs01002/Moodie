import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { glob } from 'glob';

import liveReload from 'vite-plugin-live-reload';

function moveOutputPlugin() {
  return {
    name: 'move-output',
    enforce: 'post',
    apply: 'build',
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith('pages/')) {
          const newFileName = fileName.slice('pages/'.length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

export default defineConfig({
  // base 的寫法:
  // base: '/Repository 的名稱/'
  base: '/Moodie/',
  build: {
    rollupOptions: {
      input: {
        main:   resolve(__dirname, 'index.html'),
        login:  resolve(__dirname, 'login.html'),
        excite: resolve(__dirname, '/roles/excitement.html'),
        recom:  resolve(__dirname, '/recommend/recom-excit.html'),
        barbie: resolve(__dirname, '/movie_play/barbie-play.html'),
        // 其他要「直接用網址打開」的頁面都列進來
      }
    }
  plugins: [
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html']),
    ViteEjsPlugin(),
    moveOutputPlugin(),
  ],
  server: {
    // 啟動 server 時預設開啟的頁面
    open: 'pages/movie_info/barbie-info.html',
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('pages/**/*.html')
          .map((file) => [
            path.relative(
              'pages',
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    outDir: 'dist',
  },
}),


