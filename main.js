import "/assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

console.log("Hello world)!");

// 全站樣式（有就留、沒有可移除）
// import "/assets/scss/all.scss";

// 若確定只用 Swiper，可移除 Bootstrap 這行
// import "bootstrap/dist/js/bootstrap.min.js";

const page = document.body.dataset.page?.trim();

/** 路由表：對應 data-page → 動態載入模組 */
const routes = {
  // 推薦頁：載入你做的兩支模組
  "recom-excit": async () => {
    const m1 = await import("./js/excite-gallery.js");
    if (m1?.default) await m1.default(); // 若有 default export 就呼叫
    const m2 = await import("./js/slide-overlay.js");
    if (m2?.default) await m2.default();
  },

  // 之後要加別頁就照這樣新增：
  // 'movie-play': () => import('./js/movie-play.js').then(m => m.default?.()),
};

(async () => {
  try {
    if (page && routes[page]) {
      await routes[page]();
      // console.log(`[main] loaded page scripts for: ${page}`);
    } else {
      // console.log('[main] no page-specific scripts');
    }
  } catch (err) {
    console.error("[main] load error:", err);
  }
})();
