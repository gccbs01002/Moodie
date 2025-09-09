// 表單驗證
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// 密碼顯示/隱藏切換
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const pwd = document.getElementById("inputPassword");
    const icon = this.querySelector(".material-symbols-outlined");

    if (pwd.type === "password") {
      pwd.type = "text";
      icon.textContent = "visibility"; // 顯示密碼 → 開眼睛
    } else {
      pwd.type = "password";
      icon.textContent = "visibility_off"; // 隱藏密碼 → 關眼睛
    }
  });
