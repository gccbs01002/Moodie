import "/assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import Chart from 'chart.js/auto';


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


function mountWeeklyChart(el) {
  // 把占位 div 換成 canvas
  const canvas = document.createElement('canvas');
  el.replaceChildren(canvas);

  const C = { yellow:'#F0B000', green:'#00C950', purple:'#7007E7', blue:'#193CB8' };
  const labels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const ds = {
    comedy:    [6,0,0,0,0,5,7],
    scifi:     [0,3,2.5,0,3,0,0],
    thriller:  [0,1,2,0,0,0,0],
    adventure: [0,0,0,4,.5,0,0],
  };

  // 只有最上層做圓角
  const radiusFor = (ctx) => {
    const i = ctx.dataIndex, k = ctx.datasetIndex;
    const stacks = ctx.chart.data.datasets.map(d => +d.data[i] || 0);
    let last = -1; stacks.forEach((v, idx) => { if (v>0) last = idx; });
    return k === last ? 14 : 0;
  };

  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label:'喜劇',   data: ds.comedy,    backgroundColor: C.yellow, borderSkipped:false, borderRadius: radiusFor, barPercentage:.55, categoryPercentage:.8 },
        { label:'科幻',   data: ds.scifi,     backgroundColor: C.blue,   borderSkipped:false, borderRadius: radiusFor, barPercentage:.55, categoryPercentage:.8 },
        { label:'驚悚',   data: ds.thriller,  backgroundColor: C.purple, borderSkipped:false, borderRadius: radiusFor, barPercentage:.55, categoryPercentage:.8 },
        { label:'平和',   data: ds.adventure, backgroundColor: C.green,  borderSkipped:false, borderRadius: radiusFor, barPercentage:.55, categoryPercentage:.8 },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display:false } },
      scales: {
        x: { stacked:true, grid:{ display:false }, ticks:{ color:getComputedStyle(document.documentElement).getPropertyValue('--tick') || '#cfd6de' } },
        y: { stacked:true, beginAtZero:true, suggestedMax:10,
             ticks:{ color:getComputedStyle(document.documentElement).getPropertyValue('--tick') || '#cfd6de', callback:v=>`${v} hr` },
             grid:{ color:getComputedStyle(document.documentElement).getPropertyValue('--grid') || 'rgba(255,255,255,.09)' } }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const host = document.querySelector('#chart-week');
  if (host) mountWeeklyChart(host);
});


