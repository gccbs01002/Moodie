import "/assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

console.log("Hello world");

const page = document.body.dataset.page;

async function loadPageScripts() {
  if (page === 'recom-excit') {
    await import(new URL('./js/excite-gallery.js', import.meta.url));
    await import(new URL('./js/slide-overlay.js', import.meta.url));
  }
}
loadPageScripts();