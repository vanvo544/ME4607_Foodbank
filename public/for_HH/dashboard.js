// ===== Auth guard =====
function requireHousehold() {
  const raw = localStorage.getItem("currentUser");

  if (!raw) {
    window.location.href = "../for_admin/login.html";
    return false;
  }

  try {
    const user = JSON.parse(raw);
    if (user.role !== "household") {
      window.location.href = "../for_admin/login.html";
      return false;
    }
    return user;
  } catch (err) {
    window.location.href = "../for_admin/login.html";
    return false;
  }
}

// ===== Demo data Household =====
const currentHousehold = {
  id: "HH_9100402000",
  name: "Hộ Trần Văn Hùng",
  householder: "Trần Văn Hùng",
  phone: "0928956342",
  address: "123 Đường A, Quận 4, TP.HCM",
  initials: "TV",
};

// ===== Navigation =====
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
    orders: "navOrders",
    trips: "navTrips",
    delivery: "navDelivery",
    feedback: "navFeedback",
  };

  const btnId = mapping[currentPage];
  if (btnId) {
    document.getElementById(btnId).classList.add("nav-item-active");
  }
}

function updateHeader(title, subtitle) {
  document.getElementById("pageTitle").textContent = title;
  document.getElementById("pageSubtitle").textContent = subtitle;
}

function renderPageContent() {
  const contentArea = document.getElementById("contentArea");

  if (currentPage === "survey") {
    updateHeader("Kết quả khảo sát", "Xem thông tin khảo sát của hộ");
    renderSurveyPage();
  } else if (currentPage === "orders") {
    updateHeader("Đơn hàng", "Theo dõi các đơn hàng của hộ");
    renderOrdersPage();
  } else if (currentPage === "trips") {
    updateHeader("Chuyến giao", "Giám sát các chuyến giao hàng");
    renderTripsPage();
  } else if (currentPage === "delivery") {
    updateHeader("Xác nhận giao hàng", "Xác nhận đã nhận hàng bằng QR code");
    renderDeliveryPage();
  } else if (currentPage === "feedback") {
    updateHeader("Phản hồi & Góp ý", "Gửi phản hồi về dịch vụ của chúng tôi");
    renderFeedbackPage();
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
  const user = requireHousehold();
  if (!user) return;

  // Update user info
  document.getElementById("userName").textContent = currentHousehold.name;
  document.getElementById("userInitials").textContent =
    currentHousehold.initials;

  // Render initial page
  updateNavigation();
  renderPageContent();
});
