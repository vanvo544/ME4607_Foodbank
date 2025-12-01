// ===== Auth guard cho Community Leader =====
// Dựa trên requireHousehold() của for_HH, nhưng check role = "community"
function requireCommunityLeader() {
  const raw = localStorage.getItem("currentUser");

  if (!raw) {
    window.location.href = "../for_admin/login.html";
    return false;
  }

  try {
    const user = JSON.parse(raw);
const role = user.role;
// Chấp nhận cả 2 kiểu giống cl.js
if (role !== "community_leader" && role !== "CL") {
  alert("Bạn không có quyền truy cập giao diện Community Leader.");
  window.location.href = "../for_admin/login.html";
  return null;
}
return user;

  } catch (err) {
    window.location.href = "../for_admin/login.html";
    return false;
  }
}

// ===== Demo data Community Leader =====
const currentCommunity = {
  id: "CL_0001",
  name: "Community Leader – Tổ 3, P.1, Q.4",
  phone: "0908956342",
  area: "Tổ 3, P.1, Quận 4",
  initials: "CL",
};

// ===== Navigation state =====
let currentPage = "survey";

function toggleMobileMenu() {
  const nav = document.getElementById("sidebarNav");
  if (nav) {
    nav.classList.toggle("show");
  }
}

function closeMobileMenu() {
  const nav = document.getElementById("sidebarNav");
  if (nav) {
    nav.classList.remove("show");
  }
}

function goToPage(page) {
  currentPage = page;
  closeMobileMenu();
  updateNavigation();
  renderPageContent();
}

function updateNavigation() {
  document.querySelectorAll(".sidebar-main-nav .nav-item").forEach((btn) => {
    btn.classList.remove("nav-item-active");
  });

  const mapping = {
    survey: "navSurvey",
    households: "navHouseholds",
    requests: "navRequests",
    orders: "navOrders",
    trips: "navTrips",
  };

  const btnId = mapping[currentPage];
  if (btnId) {
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.add("nav-item-active");
  }
}

function updateHeader(title, subtitle) {
  const titleEl = document.getElementById("pageTitle");
  const subEl = document.getElementById("pageSubtitle");
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = subtitle;
}

function renderPageContent() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  if (currentPage === "survey") {
    updateHeader(
      "Khảo sát nhu cầu",
      "Điền khảo sát nhu cầu và xem lịch sử cho từng hộ yếu thế"
    );
    renderSurveyPage();
  } else if (currentPage === "households") {
    updateHeader(
      "Danh sách hộ yếu thế",
      "Cập nhật thông tin hộ yếu thế trong khu vực phụ trách"
    );
    renderHouseholdsPage();
  } else if (currentPage === "requests") {
    updateHeader(
      "Yêu cầu giao hàng",
      "Tạo yêu cầu giao hàng tập kết/đặc biệt cho khu vực"
    );
    renderRequestsPage();
  } else if (currentPage === "orders") {
    updateHeader(
      "Đơn hàng trong khu vực",
      "Theo dõi trạng thái các đơn hàng đã tạo cho hộ yếu thế"
    );
    renderOrdersPage();
  } else if (currentPage === "trips") {
    updateHeader(
      "Chuyến giao trong khu vực",
      "Giám sát bản đồ & lộ trình giao hàng của tình nguyện viên"
    );
    renderTripsPage();
  }
}

function logout() {
  if (confirm("Bạn chắc chắn muốn đăng xuất?")) {
    localStorage.removeItem("currentUser");
    window.location.href = "../for_admin/login.html";
  }
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  const user = requireCommunityLeader();
  if (!user) return;

  // Cập nhật info user trên sidebar
  const nameEl = document.getElementById("userName");
  const initialsEl = document.getElementById("userInitials");
  if (nameEl) nameEl.textContent = currentCommunity.name;
  if (initialsEl) initialsEl.textContent = currentCommunity.initials;

  // Trang đầu tiên
  updateNavigation();
  renderPageContent();
});
