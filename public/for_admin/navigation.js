function goTo(page) {
  window.location.href = page;      // hoặc `./${page}`
}
document.addEventListener("DOMContentLoaded", function () {
  const groupBtn = document.getElementById("navAccountGroupBtn");
  const submenu = document.getElementById("navAccountSubmenu");
  const chevron = document.getElementById("navAccountChevron");

  if (!groupBtn || !submenu || !chevron) return;

  function openSubmenu() {
    submenu.classList.add("nav-subitems-open");
    chevron.classList.add("nav-chevron-open");
  }

  function closeSubmenu() {
    submenu.classList.remove("nav-subitems-open");
    chevron.classList.remove("nav-chevron-open");
  }

  // Toggle khi click "Quản lý tài khoản"
  groupBtn.addEventListener("click", function () {
    const isOpen = submenu.classList.contains("nav-subitems-open");
    if (isOpen) {
      closeSubmenu();
    } else {
      openSubmenu();
    }
  });

  // Auto mở nếu đang ở 1 trong các trang con (có .nav-subitem-active)
  if (submenu.querySelector(".nav-subitem-active")) {
    openSubmenu();
  }
});
