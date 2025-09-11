// 開關 Bottom Sheet
const openBtn = document.getElementById("openSheetBtn");
const closeBtn = document.getElementById("closeSheetBtn");
const sheet = document.getElementById("emotionSheet");
const mask = document.getElementById("sheetMask");

function openSheet() {
  sheet.hidden = false;
  mask.hidden = false;
  // 下一幀再加 show 做動畫
  requestAnimationFrame(() => {
    sheet.classList.add("show");
    mask.classList.add("show");
    document.body.style.overflow = "hidden";
  });
}
function closeSheet() {
  sheet.classList.remove("show");
  mask.classList.remove("show");
  document.body.style.overflow = "";
  // 動畫完再 hidden
  setTimeout(() => {
    sheet.hidden = true;
    mask.hidden = true;
  }, 250);
}

openBtn?.addEventListener("click", openSheet);
closeBtn?.addEventListener("click", closeSheet);
mask?.addEventListener("click", closeSheet);

// 點選項切換 active 並關閉
document.querySelectorAll(".bottom-sheet .sheet-options li").forEach((li) => {
  li.addEventListener("click", () => {
    document
      .querySelectorAll(".bottom-sheet .sheet-options li")
      .forEach((x) => x.classList.remove("active"));
    li.classList.add("active");
    // 改變按鈕文字
    openBtn.innerHTML = `${li.textContent.trim()} <i class="bi bi-chevron-down"></i>`;
    closeSheet();
  });
});
