import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";

import liveReload from "vite-plugin-live-reload";

function moveOutputPlugin() {
  return {
    name: "move-output",
    enforce: "post",
    apply: "build",
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith("pages/")) {
          const newFileName = fileName.slice("pages/".length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

export default defineConfig({
  // base 的寫法:
  // base: '/Repository 的名稱/'
  base: "/Moodie/",
   build: {
     rollupOptions: {
       input: {
         main:   resolve(__dirname, 'index.html'),
         recom:  resolve(__dirname, 'pages/recommend/recom-excit.html'),
         excite: resolve(__dirname, 'pages/roles/excitement.html'),
        barbieinfo: resolve(__dirname, 'pages/movie_info/barbie-info.html'),
        barbie: resolve(__dirname, 'pages/movie_play/barbie-play.html'),
            }
    }
  }
});
