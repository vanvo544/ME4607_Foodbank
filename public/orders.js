// ===== Demo data cho Orders – bạn có thể thay bằng dữ liệu thật sau này =====
const demoOrders = [
  {
    id: "#1248F9A0",
    status: "Delivered",
    campaign: "CP_2025001",
    householdId: "HH_9100402000",
    householdName: "Hộ Trần Văn Hùng",
    volunteer: "VL_9100888888 – Trần Mai Hương",
    warehouse: "WH_0002 – Kho Quận 4",
    created: "2025-03-01 07:15",
    accepted: "2025-03-01 07:20",
    delivery: "2025-03-01 07:50",
    completed: "2025-03-01 08:05",
    eta: "2025-03-01 08:05",
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
  },
];

// ===== Helpers =====
function renderOrders(list) {
  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  list.forEach((o) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><span class="order-id">${o.id}</span></td>
      <td>${o.campaign}</td>
      <td>
        ${o.householdId}
        <div class="household-sub">${o.householdName}</div>
      </td>
      <td>${o.volunteer || '<span class="household-sub">Chưa gán</span>'}</td>
      <td>${o.warehouse}</td>
      <td>
        <span class="status-pill status-${o.status}">${o.status}</span>
      </td>
      <td>${o.created || "-"}</td>
      <td>${o.accepted || "-"}</td>
      <td>${o.delivery || "-"}</td>
      <td>${o.completed || "-"}</td>
      <td>${o.eta || "-"}</td>
      <td class="col-action">
        <button class="table-action-btn" data-order="${o.id}">
          View
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // demo: click View
  document.querySelectorAll(".table-action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-order");
      alert("Demo: View chi tiết cho " + id + ". Sau này có thể mở map / trip.");
    });
  });
}

function populateFilters() {
  const campaignSelect = document.getElementById("filterCampaign");
  const warehouseSelect = document.getElementById("filterWarehouse");

  const campaigns = Array.from(new Set(demoOrders.map((o) => o.campaign)));
  const warehouses = Array.from(new Set(demoOrders.map((o) => o.warehouse)));

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

  // status từ chip đang active (ưu tiên chip)
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

  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.classList.remove("status-chip-active");
  });
  document
    .querySelector('.status-chip[data-status=""]')
    .classList.add("status-chip-active");

  renderOrders(demoOrders);
}

// ===== Khởi động =====
document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  updateStatusCounts();
  renderOrders(demoOrders);

  // search + selects
  document
    .getElementById("orderSearch")
    .addEventListener("input", applyFilters);
  document
    .getElementById("filterStatus")
    .addEventListener("change", applyFilters);
  document
    .getElementById("filterCampaign")
    .addEventListener("change", applyFilters);
  document
    .getElementById("filterWarehouse")
    .addEventListener("change", applyFilters);

  document
    .getElementById("btnApplyFilter")
    .addEventListener("click", applyFilters);
  document
    .getElementById("btnClearFilter")
    .addEventListener("click", clearFilters);

  // chips
  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".status-chip").forEach((c) =>
        c.classList.remove("status-chip-active")
      );
      chip.classList.add("status-chip-active");
      applyFilters();
    });
  });
});
