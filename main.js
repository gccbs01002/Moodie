// 讓 Vite 產生 main-*.css 並自動注入
import '/assets/scss/all.scss';
import "bootstrap/dist/js/bootstrap.min.js";

console.log("Hello world");

const BASE = import.meta.env.BASE_URL; // dev: '/', prod: '/Moodie/'
link.href = BASE + "pages/roles/excitement.html";

export default defineConfig({
  base: "/Moodie/",
  server: {
    open: "index.html", // 換成你要的頁
  },
  // build.rollupOptions.input 只影響 build，不影響 dev
});


const page = document.body.dataset.page;

if (page === 'recom-excit') {
  await import('/assets/js/excite-gallery.js');
  await import('/assets/js/slide-overlay.js');
}