// ===== Demo data Orders =====
const demoOrders = [
  {
    id: "#1248F9A0",
    status: "Delivered",
    campaign: "CP_2025001",

    householdId: "HH_9100402000",
    householdName: "Hộ Trần Văn Hùng",
    volunteer: "VL_9100888888 – Trần Mai Hương",
    warehouse: "WH_0002 – Kho Quận 4",

    // hiển thị list
    created: "2025-03-01 07:15",
    accepted: "2025-03-01 07:20",
    delivery: "2025-03-01 07:50",
    completed: "2025-03-01 08:05",
    eta: "2025-03-01 08:05",

    // bảng Order
    requestId: "RQ_000001",
    dispatchedBy: "E_9100501234",
    deliveryType: "Tập kết",
    packageCount: 5,
    totalWeight: 45,
    createdTime: "2025-03-01 07:15",
    orderedTime: "2025-03-01 07:20",
    acceptedTime: "2025-03-01 07:20",
    pickupedTime: "2025-03-01 07:50",
    completedTime: "2025-03-01 08:05",
    proofPickupUrl: "https://example.org/proofs/1248F9A0-pickup.jpg",
    proofDropoffUrl: "https://example.org/proofs/1248F9A0-dropoff.jpg",

    pickupLocation: "WH_0002 – Kho Quận 4, TP.HCM",
    dropoffLocation: "Hộ Trần Văn Hùng (HH_9100402000)"
  },
  {
    id: "#25ACDB12",
    status: "InTransit",
    campaign: "CP_2025001",

    householdId: "HH_9100401357",
    householdName: "Hộ Mai Ánh Hồng",
    volunteer: "VL_9100505678 – Nguyễn Văn An",
    warehouse: "WH_0001 – Kho Thủ Đức",

    created: "2025-03-01 09:00",
    accepted: "2025-03-01 09:05",
    delivery: "",
    completed: "",
    eta: "2025-03-01 10:45",

    requestId: "RQ_000002",
    dispatchedBy: "E_9100501234",
    deliveryType: "Tập kết",
    packageCount: 4,
    totalWeight: 32,
    createdTime: "2025-03-01 09:00",
    orderedTime: "2025-03-01 09:10",
    acceptedTime: "2025-03-01 09:05",
    pickupedTime: "",
    completedTime: "",
    proofPickupUrl: "",
    proofDropoffUrl: "",

    pickupLocation: "WH_0001 – Kho Thủ Đức, TP.HCM",
    dropoffLocation: "Hộ Mai Ánh Hồng (HH_9100401357)"
  },
  {
    id: "#9980F145",
    status: "Upcoming",
    campaign: "CP_2025002",

    householdId: "HH_9100508888",
    householdName: "Hộ Nguyễn Văn B",
    volunteer: "",
    warehouse: "WH_0003 – Kho Bình Tân",

    created: "2025-03-01 13:30",
    accepted: "",
    delivery: "",
    completed: "",
    eta: "2025-03-01 15:00",

    requestId: "RQ_000003",
    dispatchedBy: "E_9100505678",
    deliveryType: "Đặc biệt",
    packageCount: 3,
    totalWeight: 25,
    createdTime: "2025-03-01 13:30",
    orderedTime: "2025-03-01 14:00",
    acceptedTime: "",
    pickupedTime: "",
    completedTime: "",
    proofPickupUrl: "",
    proofDropoffUrl: "",

    pickupLocation: "WH_0003 – Kho Bình Tân, TP.HCM",
    dropoffLocation: "Hộ Nguyễn Văn B (HH_9100508888)"
  },
  {
    id: "#25SHDB3",
    status: "InTransit",
    campaign: "CP_2025003",

    householdId: "HH_9100507777",
    householdName: "Hộ Lê Văn C",
    volunteer: "VL_9100123456 – Phạm Hoàng Nam",
    warehouse: "WH_0002 – Kho Quận 4",

    created: "2025-11-23 16:32",
    accepted: "2025-11-23 16:40",
    delivery: "",
    completed: "",
    eta: "2025-11-23 21:36",

    requestId: "RQ_000004",
    dispatchedBy: "E_9100509999",
    deliveryType: "Tập kết",
    packageCount: 6,
    totalWeight: 52,
    createdTime: "2025-11-23 16:32",
    orderedTime: "2025-11-23 16:45",
    acceptedTime: "2025-11-23 16:40",
    pickupedTime: "",
    completedTime: "",
    proofPickupUrl: "",
    proofDropoffUrl: "",

    pickupLocation: "WH_0002 – Kho Quận 4, TP.HCM",
    dropoffLocation: "Hộ Lê Văn C (HH_9100507777)"
  }
];

// ===== Render list Orders =====
function renderOrders(list) {
  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  list.forEach((o) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <span class="order-id" data-order-id="${o.id}">${o.id}</span>

      <td>${o.volunteer || '<span class="household-sub">Chưa gán</span>'}</td>
            </td>
      <td>${o.campaign}</td>
      <td>
        ${o.householdId}
        <div class="household-sub">${o.householdName}</div>
      </td>
      <td>${o.warehouse}</td>
      <td><span class="status-pill status-${o.status}">${o.status}</span></td>
      <td>${o.created || "-"}</td>
      <td>${o.accepted || "-"}</td>
    `;
    tbody.appendChild(tr);
  });

  // Click vào Order ID => mở modal
  document.querySelectorAll(".order-id").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-order-id");
      openOrderDetail(id);
    });
  });
}

// ===== Modal chi tiết Order =====
function openOrderDetail(orderId) {
  const order = demoOrders.find((o) => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("orderDetailModal");
  const title = document.getElementById("orderDetailTitle");
  const table = document.getElementById("orderDetailTable");
  const summaryGrid = document.getElementById("orderSummaryGrid");
  const pickupLocationEl = document.getElementById("pickupLocation");
  const dropoffLocationEl = document.getElementById("dropoffLocation");
  const logsList = document.getElementById("orderLogsList");

  title.textContent = `Order detail – ${order.id}`;

  /* 1. Summary grid */
  summaryGrid.innerHTML = "";
  const summaryItems = [
    ["Order_ID", order.id],
    ["Status", order.status],
    ["Campaign_ID", order.campaign],
    ["Request_ID", order.requestId],
    ["HH_User_ID", order.householdId],
    ["Household name", order.householdName],
    ["Volunteer", order.volunteer || "Chưa gán"],
    ["Warehouse", order.warehouse],
    ["Package_Count", order.packageCount],
    ["Total_Weight (kg)", order.totalWeight],
  ];

  summaryItems.forEach(([label, value]) => {
    const div = document.createElement("div");
    div.className = "summary-item";
    div.innerHTML = `
      <div class="summary-label">${label}</div>
      <div class="summary-value">${value != null && value !== "" ? value : "-"}</div>
    `;
    summaryGrid.appendChild(div);
  });

  /* 2. Locations */
  pickupLocationEl.textContent =
    order.pickupLocation || order.warehouse || "-";
  dropoffLocationEl.textContent =
    order.dropoffLocation ||
    `${order.householdName || ""} (${order.householdId || "-"})`;

  /* 3. Logs timeline */
  logsList.innerHTML = "";
  const logs = [
    { label: "Requested", time: order.orderedTime || order.createdTime },
    { label: "Accepted", time: order.acceptedTime },
    { label: "Picked up", time: order.pickupedTime },
    { label: "Completed", time: order.completedTime },
  ].filter((log) => log.time);

  logs.forEach((log, idx) => {
    const li = document.createElement("li");
    li.className = "log-item";
    li.innerHTML = `
      <div class="log-timeline">
        <div class="log-dot"></div>
        ${idx < logs.length - 1 ? '<div class="log-line"></div>' : ""}
      </div>
      <div class="log-content">
        <span class="log-label">${log.label}</span>
        <span class="log-time">${log.time}</span>
      </div>
    `;
    logsList.appendChild(li);
  });

  /* 4. Bảng all fields */
  table.innerHTML = "";
  const rows = [  ];

  rows.forEach(([label, value]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="detail-label">${label}</td>
      <td class="detail-value">${value}</td>
    `;
    table.appendChild(tr);
  });

  modal.classList.remove("hidden");
}

function closeOrderDetail() {
  document.getElementById("orderDetailModal").classList.add("hidden");
}

// ===== Filters & chips =====
function populateFilters() {
  const campaignSelect = document.getElementById("filterCampaign");
  const warehouseSelect = document.getElementById("filterWarehouse");

  const campaigns = [...new Set(demoOrders.map((o) => o.campaign))];
  const warehouses = [...new Set(demoOrders.map((o) => o.warehouse))];

  campaigns.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    campaignSelect.appendChild(opt);
  });

  warehouses.forEach((w) => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = w;
    warehouseSelect.appendChild(opt);
  });
}

function updateStatusCounts() {
  const total = demoOrders.length;
  const inTransit = demoOrders.filter((o) => o.status === "InTransit").length;
  const delivered = demoOrders.filter((o) => o.status === "Delivered").length;
  const upcoming = demoOrders.filter((o) => o.status === "Upcoming").length;

  document.getElementById("countAll").textContent = total;
  document.getElementById("countInTransit").textContent = inTransit;
  document.getElementById("countDelivered").textContent = delivered;
  document.getElementById("countUpcoming").textContent = upcoming;
}

function applyFilters() {
  const searchText = document
    .getElementById("orderSearch")
    .value.toLowerCase()
    .trim();
  const statusSelect = document.getElementById("filterStatus").value;
  const campaignSelect = document.getElementById("filterCampaign").value;
  const warehouseSelect = document.getElementById("filterWarehouse").value;

  const activeChip = document.querySelector(".status-chip-active");
  const chipStatus = activeChip ? activeChip.dataset.status : "";
  const statusFilter = chipStatus || statusSelect || "";

  const filtered = demoOrders.filter((o) => {
    const matchSearch =
      !searchText ||
      o.id.toLowerCase().includes(searchText) ||
      (o.volunteer && o.volunteer.toLowerCase().includes(searchText)) ||
      (o.householdName && o.householdName.toLowerCase().includes(searchText));

    const matchStatus = !statusFilter || o.status === statusFilter;
    const matchCampaign = !campaignSelect || o.campaign === campaignSelect;
    const matchWarehouse = !warehouseSelect || o.warehouse === warehouseSelect;

    return matchSearch && matchStatus && matchCampaign && matchWarehouse;
  });

  renderOrders(filtered);
}

function clearFilters() {
  document.getElementById("orderSearch").value = "";
  document.getElementById("filterStatus").value = "";
  document.getElementById("filterCampaign").value = "";
  document.getElementById("filterWarehouse").value = "";

  document.querySelectorAll(".status-chip").forEach((chip) =>
    chip.classList.remove("status-chip-active")
  );
  document
    .querySelector('.status-chip[data-status=""]')
    .classList.add("status-chip-active");

  renderOrders(demoOrders);
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  updateStatusCounts();
  renderOrders(demoOrders); // chỉ render list, không mở modal

  document.getElementById("orderSearch").addEventListener("input", applyFilters);
  document.getElementById("filterStatus").addEventListener("change", applyFilters);
  document.getElementById("filterCampaign").addEventListener("change", applyFilters);
  document
    .getElementById("filterWarehouse")
    .addEventListener("change", applyFilters);
  document.getElementById("btnApplyFilter").addEventListener("click", applyFilters);
  document.getElementById("btnClearFilter").addEventListener("click", clearFilters);

  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".status-chip").forEach((c) =>
        c.classList.remove("status-chip-active")
      );
      chip.classList.add("status-chip-active");
      applyFilters();
    });
  });

  document
    .getElementById("orderDetailClose")
    .addEventListener("click", closeOrderDetail);
  document
    .getElementById("orderDetailBackdrop")
    .addEventListener("click", closeOrderDetail);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOrderDetail();
  });
});
