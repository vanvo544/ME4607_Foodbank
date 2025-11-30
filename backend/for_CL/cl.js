// ===== Auth guard: chỉ cho Community Leader =====
function requireCommunityLeader() {
  const raw = localStorage.getItem("currentUser");
  if (!raw) {
    window.location.href = "../public/login.html";
    return null;
  }
  try {
    const user = JSON.parse(raw);
    const role = user?.role;
    // Chấp nhận cả "community_leader" (login demo) và "CL" (sau này từ DB)
    const ok = role === "community_leader" || role === "CL";
    if (!ok) {
      alert("Bạn không có quyền truy cập giao diện Community Leader.");
      window.location.href = "../public/login.html";
      return null;
    }
    return user;
  } catch (e) {
    window.location.href = "../public/login.html";
    return null;
  }
}

// ===== Demo data =====
const clOrders = [
  {
    id: "#ORD_CL_0001",
    hhName: "Hộ Trần Văn Hùng",
    address: "Tổ 3, Khu phố 2",
    status: "Delivered",
    time: "Hôm nay • 08:10",
    volunteer: "VL_9100888888 – Trần Mai Hương",
  },
  {
    id: "#ORD_CL_0002",
    hhName: "Hộ Nguyễn Thị Lan",
    address: "Tổ 5, Khu phố 2",
    status: "InTransit",
    time: "Hôm nay • 09:00",
    volunteer: "VL_9100123456 – Phạm Hoàng Nam",
  },
  {
    id: "#ORD_CL_0003",
    hhName: "Hộ Lê Văn C",
    address: "Tổ 7, Khu phố 2",
    status: "Pending",
    time: "Hôm nay • 10:30",
    volunteer: "",
  },
];

const clHouseholds = [
  {
    id: "HH_CL_0001",
    name: "Hộ Trần Văn Hùng",
    address: "Số 12, đường 10, KP2",
    risk: "HIGH",
    lastSurvey: "2025-03-01",
    note: "Người già neo đơn",
  },
  {
    id: "HH_CL_0002",
    name: "Hộ Nguyễn Thị Lan",
    address: "Số 45, đường 8, KP2",
    risk: "MEDIUM",
    lastSurvey: "2025-03-02",
    note: "Hộ cận nghèo",
  },
  {
    id: "HH_CL_0003",
    name: "Hộ Lê Văn C",
    address: "Số 7, hẻm 3, KP2",
    risk: "LOW",
    lastSurvey: "2025-02-25",
    note: "Hộ khó khăn tạm thời",
  },
];

const clVolunteers = [
  {
    id: "VL_CL_0001",
    name: "Trần Mai Hương",
    phone: "0901 234 567",
    status: "AVAILABLE",
    vehicle: "Xe máy",
  },
  {
    id: "VL_CL_0002",
    name: "Phạm Hoàng Nam",
    phone: "0987 654 321",
    status: "BUSY",
    vehicle: "Xe máy",
  },
  {
    id: "VL_CL_0003",
    name: "Lê Thu Trang",
    phone: "0912 888 999",
    status: "INACTIVE",
    vehicle: "Không có phương tiện",
  },
];

const clSupportTickets = [
  {
    id: "INC_CL_0001",
    type: "Incident",
    title: "Hộ không có nhà khi giao",
    household: "Hộ Trần Văn Hùng",
    time: "Hôm nay • 08:20",
    status: "OPEN",
  },
  {
    id: "FB_CL_0001",
    type: "Feedback",
    title: "Hộ phản hồi gói quà thiếu dầu ăn",
    household: "Hộ Nguyễn Thị Lan",
    time: "Hôm nay • 09:15",
    status: "IN_PROGRESS",
  },
  {
    id: "FB_CL_0002",
    type: "Feedback",
    title: "Cảm ơn chương trình đã hỗ trợ",
    household: "Hộ Lê Văn C",
    time: "Hôm qua • 16:30",
    status: "RESOLVED",
  },
];

// ===== Helpers =====
function statusPill(text, type) {
  let cls =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] border";
  if (type === "Delivered") {
    cls += " bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
  } else if (type === "InTransit") {
    cls += " bg-sky-500/10 text-sky-300 border-sky-500/40";
  } else if (type === "Pending") {
    cls += " bg-amber-500/10 text-amber-300 border-amber-500/40";
  } else if (type === "HIGH") {
    cls += " bg-rose-500/10 text-rose-300 border-rose-500/40";
  } else if (type === "MEDIUM") {
    cls += " bg-amber-500/10 text-amber-300 border-amber-500/40";
  } else if (type === "LOW") {
    cls += " bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
  } else if (type === "AVAILABLE") {
    cls += " bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
  } else if (type === "BUSY") {
    cls += " bg-sky-500/10 text-sky-300 border-sky-500/40";
  } else if (type === "INACTIVE") {
    cls += " bg-slate-500/10 text-slate-300 border-slate-500/40";
  } else if (type === "Incident") {
    cls += " bg-rose-500/10 text-rose-300 border-rose-500/40";
  } else if (type === "Feedback") {
    cls += " bg-sky-500/10 text-sky-300 border-sky-500/40";
  } else if (type === "OPEN") {
    cls += " bg-amber-500/10 text-amber-300 border-amber-500/40";
  } else if (type === "IN_PROGRESS") {
    cls += " bg-sky-500/10 text-sky-300 border-sky-500/40";
  } else if (type === "RESOLVED") {
    cls += " bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
  } else {
    cls += " bg-slate-500/10 text-slate-300 border-slate-500/40";
  }
  return `<span class="${cls}">${text}</span>`;
}

// ===== Render dashboard =====
function renderDashboard() {
  const ordersToday = clOrders.length;
  const deliveredCount = clOrders.filter((o) => o.status === "Delivered").length;

  const hhCount = clHouseholds.length;
  const highRiskCount = clHouseholds.filter((h) => h.risk === "HIGH").length;

  document.getElementById("clStatOrdersToday").textContent = ordersToday;
  document.getElementById("clStatOrdersDelivered").textContent = `${deliveredCount} đã giao`;
  document.getElementById("clStatHouseholds").textContent = hhCount;
  document.getElementById("clStatHouseholdsHighRisk").textContent = String(highRiskCount);

  const listEl = document.getElementById("clUpcomingOrders");
  listEl.innerHTML = "";
  clOrders.slice(0, 3).forEach((o) => {
    const div = document.createElement("div");
    div.className =
      "bg-slate-900 rounded-2xl px-3 py-2.5 border border-slate-800 flex justify-between items-start gap-3";
    div.innerHTML = `
      <div class="flex-1">
        <p class="text-[11px] text-slate-400">${o.id}</p>
        <p class="text-[13px] font-medium text-slate-50">${o.hhName}</p>
        <p class="text-[11px] text-slate-400 mt-0.5">${o.address}</p>
        <p class="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
          <i class="fa-solid fa-motorcycle text-[10px]"></i>
          ${o.volunteer || "Chưa gán TNV"}
        </p>
      </div>
      <div class="flex flex-col items-end gap-1">
        ${statusPill(
          o.status === "Delivered"
            ? "Đã giao"
            : o.status === "InTransit"
            ? "Đang giao"
            : "Chờ xử lý",
          o.status
        )}
        <p class="text-[11px] text-slate-400 mt-1">${o.time}</p>
      </div>
    `;
    listEl.appendChild(div);
  });
}

// ===== Render orders =====
function renderOrdersList() {
  const searchTerm = document.getElementById("clOrderSearch").value.trim().toLowerCase();
  const status = document.getElementById("clOrderStatusFilter").value;
  const listEl = document.getElementById("clOrdersList");

  let items = clOrders.slice();
  if (status) items = items.filter((o) => o.status === status);
  if (searchTerm) {
    items = items.filter((o) =>
      o.id.toLowerCase().includes(searchTerm) ||
      o.hhName.toLowerCase().includes(searchTerm) ||
      (o.volunteer || "").toLowerCase().includes(searchTerm)
    );
  }

  listEl.innerHTML = "";
  items.forEach((o) => {
    const div = document.createElement("div");
    div.className =
      "bg-slate-900 rounded-2xl px-3 py-2.5 border border-slate-800 flex flex-col gap-1.5";
    div.innerHTML = `
      <div class="flex justify-between items-start gap-3">
        <div>
          <p class="text-[11px] text-slate-400">${o.id}</p>
          <p class="text-[13px] font-medium text-slate-50">${o.hhName}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">${o.address}</p>
        </div>
        <div class="text-right">
          ${statusPill(
            o.status === "Delivered"
              ? "Đã giao"
              : o.status === "InTransit"
              ? "Đang giao"
              : "Chờ xử lý",
            o.status
          )}
          <p class="text-[11px] text-slate-400 mt-1">${o.time}</p>
        </div>
      </div>
      <p class="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
        <i class="fa-solid fa-person-walking-luggage text-[10px]"></i>
        ${o.volunteer || "Chưa gán tình nguyện viên"}
      </p>
    `;
    listEl.appendChild(div);
  });

  if (items.length === 0) {
    listEl.innerHTML = '<p class="text-[12px] text-slate-400 text-center mt-4">Không có đơn phù hợp.</p>';
  }
}

// ===== Render households =====
function renderHouseholdsList() {
  const searchTerm = document.getElementById("clHouseholdSearch").value.trim().toLowerCase();
  const risk = document.getElementById("clHouseholdRiskFilter").value;
  const listEl = document.getElementById("clHouseholdsList");

  let items = clHouseholds.slice();
  if (risk) items = items.filter((h) => h.risk === risk);
  if (searchTerm) {
    items = items.filter((h) =>
      h.id.toLowerCase().includes(searchTerm) ||
      h.name.toLowerCase().includes(searchTerm) ||
      h.address.toLowerCase().includes(searchTerm)
    );
  }

  listEl.innerHTML = "";
  items.forEach((h) => {
    const div = document.createElement("div");
    div.className =
      "bg-slate-900 rounded-2xl px-3 py-2.5 border border-slate-800 flex flex-col gap-1.5";
    div.innerHTML = `
      <div class="flex justify-between items-start gap-3">
        <div>
          <p class="text-[11px] text-slate-400">${h.id}</p>
          <p class="text-[13px] font-medium text-slate-50">${h.name}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">${h.address}</p>
        </div>
        <div class="text-right flex flex-col items-end gap-1">
          ${statusPill(
            h.risk === "HIGH"
              ? "Nguy cơ cao"
              : h.risk === "MEDIUM"
              ? "Trung bình"
              : "Thấp",
            h.risk
          )}
          <p class="text-[11px] text-slate-400">
            Khảo sát gần nhất: ${h.lastSurvey}
          </p>
        </div>
      </div>
      <p class="text-[11px] text-slate-500 mt-0.5">
        Ghi chú: ${h.note}
      </p>
    `;
    listEl.appendChild(div);
  });

  if (items.length === 0) {
    listEl.innerHTML = '<p class="text-[12px] text-slate-400 text-center mt-4">Không có hộ phù hợp.</p>';
  }
}

// ===== Render volunteers =====
function renderVolunteersList() {
  const searchTerm = document.getElementById("clVolunteerSearch").value.trim().toLowerCase();
  const status = document.getElementById("clVolunteerStatusFilter").value;
  const listEl = document.getElementById("clVolunteersList");

  let items = clVolunteers.slice();
  if (status) items = items.filter((v) => v.status === status);
  if (searchTerm) {
    items = items.filter((v) =>
      v.name.toLowerCase().includes(searchTerm) ||
      v.phone.toLowerCase().includes(searchTerm)
    );
  }

  listEl.innerHTML = "";
  items.forEach((v) => {
    const div = document.createElement("div");
    div.className =
      "bg-slate-900 rounded-2xl px-3 py-2.5 border border-slate-800 flex justify-between items-center gap-3";
    div.innerHTML = `
      <div>
        <p class="text-[13px] font-medium text-slate-50">${v.name}</p>
        <p class="text-[11px] text-slate-400 mt-0.5">${v.phone}</p>
        <p class="text-[11px] text-slate-500 mt-0.5">
          Phương tiện: ${v.vehicle}
        </p>
      </div>
      <div class="flex flex-col items-end gap-1">
        ${statusPill(
          v.status === "AVAILABLE"
            ? "Rảnh"
            : v.status === "BUSY"
            ? "Đang giao"
            : "Ngưng",
          v.status
        )}
      </div>
    `;
    listEl.appendChild(div);
  });

  if (items.length === 0) {
    listEl.innerHTML = '<p class="text-[12px] text-slate-400 text-center mt-4">Không có tình nguyện viên phù hợp.</p>';
  }
}

// ===== Render support =====
function renderSupportList() {
  const listEl = document.getElementById("clSupportList");
  listEl.innerHTML = "";
  clSupportTickets.forEach((t) => {
    const div = document.createElement("div");
    div.className =
      "bg-slate-900 rounded-2xl px-3 py-2.5 border border-slate-800 flex flex-col gap-1.5";
    div.innerHTML = `
      <div class="flex justify-between items-start gap-3">
        <div>
          <p class="text-[11px] text-slate-400">${t.id}</p>
          <p class="text-[13px] font-medium text-slate-50">${t.title}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">
            Hộ liên quan: ${t.household}
          </p>
        </div>
        <div class="flex flex-col items-end gap-1">
          ${statusPill(t.type === "Incident" ? "Sự cố" : "Góp ý", t.type)}
          ${statusPill(
            t.status === "OPEN"
              ? "Mới"
              : t.status === "IN_PROGRESS"
              ? "Đang xử lý"
              : "Đã xử lý",
            t.status
          )}
          <p class="text-[11px] text-slate-400 mt-0.5">${t.time}</p>
        </div>
      </div>
    `;
    listEl.appendChild(div);
  });
}

// ===== Navigation =====
function switchScreen(name) {
  document.querySelectorAll("[data-screen]").forEach((sec) => {
    sec.classList.toggle("hidden", sec.dataset.screen !== name);
  });
  document.querySelectorAll(".cl-nav-item").forEach((btn) => {
    btn.classList.toggle("cl-nav-item-active", btn.dataset.tab === name);
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  const user = requireCommunityLeader();
  if (!user) return;

  // hiển thị tên / khu vực demo
  document.getElementById("clDisplayName").textContent = user.phone || "Community Leader";
  document.getElementById("clAreaName").textContent = "Khu phố 2, Phường 1, Quận 4";

  renderDashboard();
  renderOrdersList();
  renderHouseholdsList();
  renderVolunteersList();
  renderSupportList();

  document.querySelectorAll(".cl-nav-item").forEach((btn) => {
    btn.addEventListener("click", () => switchScreen(btn.dataset.tab));
  });
  switchScreen("dashboard");

  document.getElementById("clOrderSearch").addEventListener("input", renderOrdersList);
  document.getElementById("clOrderStatusFilter").addEventListener("change", renderOrdersList);

  document.getElementById("clHouseholdSearch").addEventListener("input", renderHouseholdsList);
  document.getElementById("clHouseholdRiskFilter").addEventListener("change", renderHouseholdsList);

  document.getElementById("clVolunteerSearch").addEventListener("input", renderVolunteersList);
  document.getElementById("clVolunteerStatusFilter").addEventListener("change", renderVolunteersList);

  document.getElementById("clLogout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../public/login.html";
  });
});
