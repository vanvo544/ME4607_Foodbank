// ===== Demo data Orders cho Community Leader =====
// Tái sử dụng cấu trúc như householdOrders để theo dõi các đơn trong khu vực
const communityOrders = [
  {
    id: "#1248F9A0",
    status: "Delivered",
    campaign: "CP_2025001 – Mái ấm Nhật Hồng",
    volunteer: "VL_9100888888 – Trần Mai Hương",
    warehouse: "WH_0002 – Kho Quận 4",
    household: "HH_9100402000 – Hộ Trần Văn Hùng",
    created: "2025-03-01 07:15",
    accepted: "2025-03-01 07:20",
    delivery: "2025-03-01 07:50",
    completed: "2025-03-01 08:05",
    packageCount: 5,
    totalWeight: 45,
  },
  {
    id: "#25ACDB12",
    status: "InTransit",
    campaign: "CP_2025001 – Mái ấm Nhật Hồng",
    volunteer: "VL_9100505678 – Nguyễn Văn An",
    warehouse: "WH_0001 – Kho Thủ Đức",
    household: "HH_9100501001 – Hộ Nguyễn Thị Lan",
    created: "2025-03-01 09:00",
    accepted: "2025-03-01 09:05",
    delivery: "",
    completed: "",
    packageCount: 4,
    totalWeight: 32,
  },
  {
    id: "#9980F145",
    status: "Upcoming",
    campaign: "CP_2025002 – Hỗ trợ mùa mưa 2025",
    volunteer: "",
    warehouse: "WH_0003 – Kho Bình Tân",
    household: "HH_9100602002 – Hộ Lê Văn C",
    created: "2025-03-01 13:30",
    accepted: "",
    delivery: "",
    completed: "",
    packageCount: 3,
    totalWeight: 25,
  },
];

let filteredCommunityOrders = [...communityOrders];

// ===== Trang: Đơn hàng trong khu vực =====
function renderOrdersPage() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `
    <div class="panel">
      <div style="margin-bottom: 16px;">
        <h2 class="panel-title" style="margin-bottom: 12px;">📦 Đơn hàng trong khu vực</h2>
        <p class="panel-subtitle">
          Community Leader theo dõi các đơn hàng đã được tạo từ khu vực mình phụ trách.
        </p>
        
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          <input 
            id="orderSearch" 
            class="input" 
            placeholder="Tìm Mã đơn, chiến dịch hoặc hộ..." 
            style="flex: 1; min-width: 220px;"
          />
          <select id="statusFilter" class="input" style="min-width: 160px;">
            <option value="">-- Tất cả trạng thái --</option>
            <option value="Delivered">Đã giao</option>
            <option value="InTransit">Đang giao</option>
            <option value="Upcoming">Sắp giao</option>
          </select>
          <button class="btn btn-outline" onclick="applyOrderFilters()">Lọc</button>
          <button class="btn btn-outline" onclick="clearOrderFilters()">Xóa</button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Mã Đơn</th>
              <th>Trạng thái</th>
              <th>Chiến dịch</th>
              <th>Hộ yếu thế</th>
              <th>Tình nguyện viên</th>
              <th>Số kiện</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          <tbody id="orderTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  renderOrdersList();
  setupOrderListeners();
}

function renderOrdersList() {
  const tbody = document.getElementById("orderTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  filteredCommunityOrders.forEach((order) => {
    const statusClass = `status-${order.status}`;
    const statusText = getStatusText(order.status);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${order.id}</td>
      <td><span class="status-pill ${statusClass}">${statusText}</span></td>
      <td>${order.campaign}</td>
      <td>${order.household}</td>
      <td>${order.volunteer || "Chưa gán"}</td>
      <td>${order.packageCount}</td>
      <td>${order.created}</td>
    `;
    tbody.appendChild(tr);
  });
}

function getStatusText(status) {
  const mapping = {
    Delivered: "✓ Đã giao",
    InTransit: "🚚 Đang giao",
    Upcoming: "⏱ Sắp giao",
  };
  return mapping[status] || status;
}

function applyOrderFilters() {
  const searchText = document
    .getElementById("orderSearch")
    .value.toLowerCase()
    .trim();
  const statusFilter = document.getElementById("statusFilter").value;

  filteredCommunityOrders = communityOrders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.campaign.toLowerCase().includes(searchText) ||
      (order.household || "").toLowerCase().includes(searchText);
    const matchStatus = !statusFilter || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  renderOrdersList();
}

function clearOrderFilters() {
  document.getElementById("orderSearch").value = "";
  document.getElementById("statusFilter").value = "";
  filteredCommunityOrders = [...communityOrders];
  renderOrdersList();
}

function setupOrderListeners() {
  const searchInput = document.getElementById("orderSearch");
  const statusSelect = document.getElementById("statusFilter");
  if (searchInput) {
    searchInput.addEventListener("input", applyOrderFilters);
  }
  if (statusSelect) {
    statusSelect.addEventListener("change", applyOrderFilters);
  }
}

// ===== Trang: Tạo yêu cầu giao hàng =====
const CL_REQUESTS_KEY = "cl_requests";

function loadRequests() {
  try {
    const raw = localStorage.getItem(CL_REQUESTS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

function saveRequests(list) {
  localStorage.setItem(CL_REQUESTS_KEY, JSON.stringify(list));
}

function renderRequestsPage() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  const requests = loadRequests();

  contentArea.innerHTML = `
    <div class="panel">
      <h2 class="panel-title">📦 Tạo yêu cầu giao hàng</h2>
      <p class="panel-subtitle">
        Community Leader tổng hợp nhu cầu và gửi yêu cầu giao hàng tập kết / đặc biệt cho khu vực.
      </p>

      <form id="requestForm">
        <div class="info-grid">
          <div class="input-group">
            <label>Kiểu yêu cầu giao hàng *</label>
            <select id="reqType" class="input" required>
              <option value="Tập kết">Tập kết</option>
              <option value="Đặc biệt">Đặc biệt</option>
            </select>
          </div>
          <div class="input-group">
            <label>Số hộ yếu thế ước tính *</label>
            <input id="reqHouseholds" type="number" min="1" class="input" required />
          </div>
          <div class="input-group">
            <label>Mức độ ưu tiên *</label>
            <select id="reqPriority" class="input" required>
              <option value="Cao">Cao</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Thấp">Thấp</option>
            </select>
          </div>
        </div>

        <div class="input-group">
          <label>Mô tả / Ghi chú</label>
          <textarea id="reqNote" class="input" rows="3" placeholder="Mô tả sơ bộ về khu vực, thời điểm mong muốn, loại hàng..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 8px;">
          ✓ Gửi yêu cầu
        </button>
      </form>
    </div>

    <div class="panel">
      <h2 class="panel-title">🗂 Danh sách yêu cầu đã gửi</h2>
      <p class="panel-subtitle">
        Các yêu cầu giao hàng đã tạo (demo – lưu trên trình duyệt).
      </p>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Kiểu yêu cầu</th>
              <th>Số hộ</th>
              <th>Ưu tiên</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody id="requestTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  // Submit form
  const form = document.getElementById("requestForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = document.getElementById("reqType").value;
    const households = Number(
      document.getElementById("reqHouseholds").value || 0
    );
    const priority = document.getElementById("reqPriority").value;
    const note = document.getElementById("reqNote").value || "";

    if (!households || households <= 0) {
      alert("Số hộ yếu thế ước tính phải lớn hơn 0.");
      return;
    }

    const now = new Date();
    const dateStr = now.toLocaleString("vi-VN");

    const newReq = {
      id: `RQ_${Date.now()}`,
      type,
      households,
      priority,
      note,
      createdAt: dateStr,
    };

    const list = loadRequests();
    list.unshift(newReq);
    saveRequests(list);

    alert("Đã tạo yêu cầu giao hàng (demo – lưu trên trình duyệt).");
    form.reset();
    renderRequestsTable(list);
  });

  renderRequestsTable(requests);
}

function renderRequestsTable(requests) {
  const tbody = document.getElementById("requestTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  requests.forEach((req) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${req.createdAt}</td>
      <td>${req.type}</td>
      <td>${req.households}</td>
      <td>${req.priority}</td>
      <td>${req.note || ""}</td>
    `;
    tbody.appendChild(tr);
  });
}
