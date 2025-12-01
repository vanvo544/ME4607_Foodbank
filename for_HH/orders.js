// ===== Demo data Orders cho Household =====
const householdOrders = [
  {
    id: "#1248F9A0",
    status: "Delivered",
    campaign: "CP_2025001 – Mái ấm Nhật Hồng",
    volunteer: "VL_9100888888 – Trần Mai Hương",
    warehouse: "WH_0002 – Kho Quận 4",
    created: "2025-03-01 07:15",
    accepted: "2025-03-01 07:20",
    delivery: "2025-03-01 07:50",
    completed: "2025-03-01 08:05",
    packageCount: 5,
    totalWeight: 45,
    proofPickupUrl: "https://example.org/proofs/1248F9A0-pickup.jpg",
    proofDropoffUrl: "https://example.org/proofs/1248F9A0-dropoff.jpg",
    pickupLocation: "WH_0002 – Kho Quận 4, TP.HCM",
    dropoffLocation: "Hộ Trần Văn Hùng (HH_9100402000)",
  },
  {
    id: "#25ACDB12",
    status: "InTransit",
    campaign: "CP_2025001 – Mái ấm Nhật Hồng",
    volunteer: "VL_9100505678 – Nguyễn Văn An",
    warehouse: "WH_0001 – Kho Thủ Đức",
    created: "2025-03-01 09:00",
    accepted: "2025-03-01 09:05",
    delivery: "",
    completed: "",
    packageCount: 4,
    totalWeight: 32,
    proofPickupUrl: "",
    proofDropoffUrl: "",
    pickupLocation: "WH_0001 – Kho Thủ Đức, TP.HCM",
    dropoffLocation: "Hộ Trần Văn Hùng (HH_9100402000)",
  },
  {
    id: "#9980F145",
    status: "Upcoming",
    campaign: "CP_2025002 – Hỗ trợ mùa mưa 2025",
    volunteer: "",
    warehouse: "WH_0003 – Kho Bình Tân",
    created: "2025-03-01 13:30",
    accepted: "",
    delivery: "",
    completed: "",
    packageCount: 3,
    totalWeight: 25,
    proofPickupUrl: "",
    proofDropoffUrl: "",
    pickupLocation: "WH_0003 – Kho Bình Tân, TP.HCM",
    dropoffLocation: "Hộ Trần Văn Hùng (HH_9100402000)",
  },
];

let filteredOrders = [...householdOrders];

// ===== Render Orders Page =====
function renderOrdersPage() {
  const contentArea = document.getElementById("contentArea");

  contentArea.innerHTML = `
    <div class="panel">
      <div style="margin-bottom: 16px;">
        <h2 class="panel-title" style="margin-bottom: 12px;">Danh Sách Đơn Hàng</h2>
        
        <div style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
          <input 
            id="orderSearch" 
            class="input" 
            placeholder="Tìm Mã đơn hàng..." 
            style="flex: 1; min-width: 200px;"
          />
          <select id="statusFilter" class="input" style="min-width: 150px;">
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
              <th>Trạng Thái</th>
              <th>Chiến Dịch</th>
              <th>Tình Nguyện Viên</th>
              <th>Số Kiện</th>
              <th>Ngày Tạo</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody id="orderTableBody">
            <!-- JS render danh sách -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal chi tiết -->
    <div id="orderDetailModal" class="modal">
      <div class="modal-backdrop" id="orderDetailBackdrop" onclick="closeOrderDetail()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title" id="orderDetailTitle">Chi tiết đơn hàng</h2>
            <button class="modal-close" id="orderDetailClose" onclick="closeOrderDetail()">×</button>
          </div>
          
          <div id="orderDetailBody">
            <!-- Chi tiết sẽ được render ở đây -->
          </div>
        </div>
      </div>
    </div>
  `;

  renderOrdersList();
  setupOrderListeners();
}

function renderOrdersList() {
  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  filteredOrders.forEach((order) => {
    const statusClass = `status-${order.status}`;
    const statusText = getStatusText(order.status);

    const row = `
      <tr>
        <td>
          <button class="order-id" onclick="openOrderDetail('${order.id}')">
            ${order.id}
          </button>
        </td>
        <td>
          <span class="status-pill ${statusClass}">${statusText}</span>
        </td>
        <td>${order.campaign}</td>
        <td>${order.volunteer || "Chưa gán"}</td>
        <td>${order.packageCount}</td>
        <td>${order.created}</td>
        <td>
          <button class="btn btn-outline" onclick="openOrderDetail('${order.id}')" style="padding: 4px 8px; font-size: 0.8rem;">
            Xem
          </button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
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

function openOrderDetail(orderId) {
  const order = householdOrders.find((o) => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("orderDetailModal");
  const title = document.getElementById("orderDetailTitle");
  const body = document.getElementById("orderDetailBody");

  title.textContent = `Chi tiết đơn hàng – ${order.id}`;

  const statusClass = `status-${order.status}`;
  const statusText = getStatusText(order.status);

  body.innerHTML = `
    <div style="display: grid; gap: 16px;">
      <div>
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280;">Thông Tin Chung</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Mã Đơn</div>
            <div class="info-value">${order.id}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Trạng Thái</div>
            <div style="margin-top: 4px;">
              <span class="status-pill ${statusClass}">${statusText}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">Chiến Dịch</div>
            <div class="info-value">${order.campaign}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Kho</div>
            <div class="info-value">${order.warehouse}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280;">Thông Tin Giao Hàng</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Tình Nguyện Viên</div>
            <div class="info-value">${order.volunteer || "Chưa gán"}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Số Kiện</div>
            <div class="info-value">${order.packageCount}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Tổng Trọng Lượng</div>
            <div class="info-value">${order.totalWeight} kg</div>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280;">Địa Điểm</h3>
        <div style="display: flex; gap: 20px;">
          <div>
            <p style="margin: 0 0 4px; font-size: 0.8rem; color: #9ca3af; text-transform: uppercase;">Lấy từ</p>
            <p style="margin: 0; font-size: 0.9rem; color: #4b5563;">${order.pickupLocation}</p>
          </div>
          <div>
            <p style="margin: 0 0 4px; font-size: 0.8rem; color: #9ca3af; text-transform: uppercase;">Giao tới</p>
            <p style="margin: 0; font-size: 0.9rem; color: #4b5563;">${order.dropoffLocation}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280;">Timeline</h3>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
          <div style="display: flex; gap: 12px;">
            <span style="min-width: 120px; color: #6b7280;">Tạo đơn:</span>
            <span>${order.created}</span>
          </div>
          ${
            order.accepted
              ? `
            <div style="display: flex; gap: 12px;">
              <span style="min-width: 120px; color: #6b7280;">Chấp nhận:</span>
              <span>${order.accepted}</span>
            </div>
          `
              : ""
          }
          ${
            order.delivery
              ? `
            <div style="display: flex; gap: 12px;">
              <span style="min-width: 120px; color: #6b7280;">Bắt đầu giao:</span>
              <span>${order.delivery}</span>
            </div>
          `
              : ""
          }
          ${
            order.completed
              ? `
            <div style="display: flex; gap: 12px;">
              <span style="min-width: 120px; color: #6b7280;">Hoàn thành:</span>
              <span>${order.completed}</span>
            </div>
          `
              : ""
          }
        </div>
      </div>

      <div style="display: flex; gap: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
        <button class="btn btn-outline" onclick="closeOrderDetail()" style="flex: 1;">Đóng</button>
      </div>
    </div>
  `;

  modal.classList.add("visible");
}

function closeOrderDetail() {
  document.getElementById("orderDetailModal").classList.remove("visible");
}

function applyOrderFilters() {
  const searchText = document
    .getElementById("orderSearch")
    .value.toLowerCase()
    .trim();
  const statusFilter = document.getElementById("statusFilter").value;

  filteredOrders = householdOrders.filter((order) => {
    const matchSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.campaign.toLowerCase().includes(searchText);
    const matchStatus = !statusFilter || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  renderOrdersList();
}

function clearOrderFilters() {
  document.getElementById("orderSearch").value = "";
  document.getElementById("statusFilter").value = "";
  filteredOrders = [...householdOrders];
  renderOrdersList();
}

function setupOrderListeners() {
  document
    .getElementById("orderSearch")
    .addEventListener("input", applyOrderFilters);
  document
    .getElementById("statusFilter")
    .addEventListener("change", applyOrderFilters);
}
