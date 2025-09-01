import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { fileURLToPath } from "node:url";

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