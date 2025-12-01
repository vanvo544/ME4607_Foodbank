// ===== Demo data cho Trip =====
// Sau này bạn có thể thay bằng dữ liệu thật từ backend

const trips = [
  {
    id: "#25ACDB12",
    status: "InProcess",
    volunteer: "VL_9100505678 – Nguyễn Văn An",
    campaign: "CP_2025001 – Mái ấm Nhật Hồng",
    warehouse: "WH_0001 – Kho Thủ Đức",
    distanceKm: 12.5,
    pickupAddress: "Kho WH_0001, P. Linh Trung, TP. Thủ Đức",
    pickupTime: "15.08.2025 • 09:10 AM",
    sortingAddress: "Điểm tập kết Linh Trung",
    sortingTime: "15.08.2025 • 09:30 AM",
    deliveredAddress:
      "HH_9100401357 – Mai Ánh Hồng, Khu phố 3, P. Linh Trung, TP. Thủ Đức",
    deliveredTime: "15.08.2025 • 10:05 AM",
    gps: [
      {
        seq: 1,
        time: "15.08.2025 • 09:12",
        lat: 10.8705,
        lng: 106.7712,
        address: "Kho WH_0001, P. Linh Trung, TP. Thủ Đức",
        speed: 22,
        status: "Rời kho",
      },
      {
        seq: 2,
        time: "15.08.2025 • 09:20",
        lat: 10.873,
        lng: 106.765,
        address: "Xa lộ Hà Nội (gần ngã tư Thủ Đức)",
        speed: 18,
        status: "Lưu thông bình thường",
      },
      {
        seq: 3,
        time: "15.08.2025 • 09:32",
        lat: 10.8795,
        lng: 106.7603,
        address: "Đường Hoàng Diệu 2",
        speed: 10,
        status: "Kẹt xe nhẹ",
      },
      {
        seq: 4,
        time: "15.08.2025 • 09:45",
        lat: 10.8821,
        lng: 106.757,
        address: "Hẻm vào khu dân cư, gần HH_9100401357",
        speed: 8,
        status: "Đang tìm địa chỉ",
      },
      {
        seq: 5,
        time: "15.08.2025 • 10:05",
        lat: 10.883,
        lng: 106.7565,
        address: "HH_9100401357 – Mai Ánh Hồng",
        speed: 0,
        status: "Đã giao hàng",
      },
    ],
    progress: 0.85,
  },
  {
    id: "#9980F145",
    status: "Planned",
    volunteer: "Chưa gán",
    campaign: "CP_2025002 – Hỗ trợ mùa mưa 2025",
    warehouse: "WH_0003 – Kho Bình Tân",
    distanceKm: 8.0,
    pickupAddress: "Kho WH_0003, Bình Tân",
    pickupTime: "16.08.2025 • 07:30 AM",
    sortingAddress: "Điểm tập kết quận Bình Tân",
    sortingTime: "16.08.2025 • 07:50 AM",
    deliveredAddress: "Các hộ yếu thế Q. Bình Tân",
    deliveredTime: "",
    gps: [],
    progress: 0.0,
  },
  {
    id: "#A1B2C3D4",
    status: "Completed",
    volunteer: "VL_9100402000 – Trần Văn Hùng",
    campaign: "CP_2025003 – Giỏ quà dinh dưỡng",
    warehouse: "WH_0002 – Kho Quận 4",
    distanceKm: 6.2,
    pickupAddress: "Kho WH_0002, Quận 4",
    pickupTime: "14.08.2025 • 15:20 PM",
    sortingAddress: "Điểm tập kết P.8, Quận 4",
    sortingTime: "14.08.2025 • 15:45 PM",
    deliveredAddress: "HH_9100402000 – Trần Văn Hùng, P.8, Quận 4",
    deliveredTime: "14.08.2025 • 16:10 PM",
    gps: [
      {
        seq: 1,
        time: "14.08.2025 • 15:21",
        lat: 10.7589,
        lng: 106.701,
        address: "Kho WH_0002 – Quận 4",
        speed: 25,
        status: "Rời kho",
      },
      {
        seq: 2,
        time: "14.08.2025 • 15:28",
        lat: 10.7612,
        lng: 106.7042,
        address: "Cầu Calmette",
        speed: 20,
        status: "Đang di chuyển",
      },
      {
        seq: 3,
        time: "14.08.2025 • 15:35",
        lat: 10.7631,
        lng: 106.7068,
        address: "Đường Hoàng Diệu",
        speed: 12,
        status: "Kẹt xe nhẹ",
      },
      {
        seq: 4,
        time: "14.08.2025 • 15:50",
        lat: 10.7655,
        lng: 106.7048,
        address: "P.8, Quận 4",
        speed: 8,
        status: "Đang tìm địa chỉ",
      },
      {
        seq: 5,
        time: "14.08.2025 • 16:10",
        lat: 10.767,
        lng: 106.7065,
        address: "HH_9100402000 – Trần Văn Hùng, Q.4",
        speed: 3,
        status: "Đã giao xong",
      },
    ],
    progress: 1.0,
  },
];

// trạng thái -> label đẹp
function prettyStatus(status) {
  switch (status) {
    case "Planned":
      return "Planned";
    case "InProcess":
      return "In Process";
    case "Completed":
      return "Completed";
    case "Cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

// ===== Render danh sách Trip bên trái =====
function renderTripList(filterStatus = "ALL", searchTerm = "") {
  const listEl = document.getElementById("tripList");
  if (!listEl) return;

  const term = searchTerm.trim().toLowerCase();

  let data = trips.slice();

  if (filterStatus !== "ALL") {
    data = data.filter((t) => t.status === filterStatus);
  }

  if (term) {
    data = data.filter((t) => {
      return (
        t.id.toLowerCase().includes(term) ||
        (t.volunteer && t.volunteer.toLowerCase().includes(term)) ||
        (t.campaign && t.campaign.toLowerCase().includes(term)) ||
        (t.warehouse && t.warehouse.toLowerCase().includes(term))
      );
    });
  }

  listEl.innerHTML = "";

  if (!data.length) {
    listEl.innerHTML =
      '<div class="empty-state">Không tìm thấy chuyến nào phù hợp.</div>';
    return;
  }

  data.forEach((trip) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "trip-card";
    item.innerHTML = `
      <div class="trip-card-header">
        <span class="trip-id">${trip.id}</span>
        <span class="status-pill status-${trip.status}">${prettyStatus(
      trip.status
    )}</span>
      </div>
      <div class="trip-card-body">
        <div class="trip-card-line">
          <span class="label">Volunteer:</span>
          <span class="value">${trip.volunteer}</span>
        </div>
        <div class="trip-card-line">
          <span class="label">Campaign:</span>
          <span class="value">${trip.campaign}</span>
        </div>
        <div class="trip-card-line">
          <span class="label">Warehouse:</span>
          <span class="value">${trip.warehouse}</span>
        </div>
      </div>
      <div class="trip-card-footer">
        <span>${trip.distanceKm} km</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${
            (trip.progress || 0) * 100
          }%;"></div>
        </div>
      </div>
    `;

    item.addEventListener("click", () => {
      renderTripDetail(trip);
    });

    listEl.appendChild(item);
  });

  // hiển thị trip đầu tiên nếu chưa có gì
  const first = data[0];
  if (first) {
    renderTripDetail(first);
  }
}

// ===== Render chi tiết Trip bên phải =====
let mapInstance = null;
let mapLayerGroup = null;
let currentTrip = null;

function renderTripDetail(trip) {
  currentTrip = trip;
  if (!trip) return;

  // header
  document.getElementById("detailTripId").textContent = trip.id;
  const statusSpan = document.getElementById("detailTripStatus");
  statusSpan.textContent = prettyStatus(trip.status);
  statusSpan.className = `status-pill status-${trip.status}`;

  // timeline text (3 mốc chính)
  document.getElementById("pickupAddress").textContent = trip.pickupAddress;
  document.getElementById("pickupTime").textContent = trip.pickupTime;
  document.getElementById("sortingAddress").textContent = trip.sortingAddress;
  document.getElementById("sortingTime").textContent = trip.sortingTime;
  document.getElementById("deliveredAddress").textContent =
    trip.deliveredAddress;
  document.getElementById("deliveredTime").textContent =
    trip.deliveredTime || "";

  // meta
  document.getElementById("detailVolunteer").textContent = trip.volunteer;
  document.getElementById("detailCampaign").textContent = trip.campaign;
  document.getElementById("detailWarehouse").textContent = trip.warehouse;
  document.getElementById("detailDistance").textContent =
    trip.distanceKm + " km";

  // Load info = GPS log table
  renderGpsLog(trip);

  // Map: xem tab nào đang active để quyết định mode
  const activeTab = document.querySelector(".timeline-tabs .tab.tab-active");
  const mode =
    activeTab && activeTab.dataset.tab === "load" ? "load" : "tracking";
  updateMap(trip, mode);
}

// Render bảng GPS log
function renderGpsLog(trip) {
  const tbody = document.getElementById("gpsLogTableBody");
  const summaryEl = document.getElementById("gpsSummary");
  if (!tbody) return;
  tbody.innerHTML = "";

  const gps = trip.gps || [];

  if (!gps.length) {
    tbody.innerHTML =
      '<tr><td colspan="7" class="empty-state">Chưa có dữ liệu GPS (demo)</td></tr>';
    if (summaryEl) {
      summaryEl.textContent = "0 điểm GPS – cập nhật 2 phút/lần (demo)";
    }
    return;
  }

  gps.forEach((point) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${point.seq}</td>
      <td>${point.time}</td>
      <td>${point.lat.toFixed(5)}</td>
      <td>${point.lng.toFixed(5)}</td>
      <td>${point.address}</td>
      <td>${point.speed} km/h</td>
      <td>${point.status}</td>
    `;
    tbody.appendChild(tr);
  });

  if (summaryEl) {
    summaryEl.textContent = `${gps.length} điểm GPS – cập nhật 2 phút/lần (demo)`;
  }
}

// ===== Map Leaflet =====
function initMapIfNeeded(centerLatLng) {
  if (!mapInstance) {
    mapInstance = L.map("map").setView(centerLatLng, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance);

    mapLayerGroup = L.layerGroup().addTo(mapInstance);
  } else {
    mapInstance.setView(centerLatLng, 13);
    if (mapLayerGroup) {
      mapLayerGroup.clearLayers();
    } else {
      mapLayerGroup = L.layerGroup().addTo(mapInstance);
    }
  }
}

// mode = "tracking" hoặc "load"
function updateMap(trip, mode) {
  const gps = trip.gps || [];
  const hasGps = gps.length > 0;

  let centerLatLng = [10.77, 106.7]; // fallback Sài Gòn
  if (hasGps) {
    centerLatLng = [gps[0].lat, gps[0].lng];
  }

  initMapIfNeeded(centerLatLng);

  if (!mapLayerGroup) return;

  // Nếu có GPS: vẽ polyline theo GPS
  if (hasGps) {
    const latlngs = gps.map((p) => [p.lat, p.lng]);
    const polyline = L.polyline(latlngs, { weight: 4 }).addTo(mapLayerGroup);

    // điểm đầu
    L.circleMarker(latlngs[0], { radius: 5 }).addTo(mapLayerGroup);
    // điểm cuối
    L.circleMarker(latlngs[latlngs.length - 1], { radius: 5 }).addTo(
      mapLayerGroup
    );

    mapInstance.fitBounds(polyline.getBounds(), { padding: [16, 16] });
  } else {
    // Không có GPS thì chỉ hiển thị map trống
    // (có thể thêm marker kho hoặc khu vực sau)
  }
}

// ===== Render Trips Page (được gọi từ dashboard.js) =====
function renderTripsPage() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `
    <div class="panel">
      <h2 class="panel-title">🗺️ Chuyến giao trong khu vực</h2>
      <p class="panel-subtitle">
        Theo dõi trạng thái và lộ trình giao hàng của tình nguyện viên
      </p>
      
      <div style="margin-bottom: 12px;">
        <input 
          type="text" 
          id="tripSearch" 
          class="input" 
          placeholder="Tìm theo mã chuyến, TNV, chiến dịch..."
          style="max-width: 300px;"
        />
      </div>

      <div class="chips-row" style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
        <button class="chip chip-active" data-status="ALL">Tất cả</button>
        <button class="chip" data-status="Planned">Kế hoạch</button>
        <button class="chip" data-status="InProcess">Đang giao</button>
        <button class="chip" data-status="Completed">Hoàn thành</button>
        <button class="chip" data-status="Cancelled">Đã hủy</button>
      </div>

      <div id="tripList" style="display: grid; gap: 12px;">
        <!-- Trip cards sẽ render ở đây -->
      </div>

      <div id="tripDetailSection" style="margin-top: 20px; display: none;">
        <h3 class="panel-title">Chi tiết chuyến giao</h3>
        <div id="tripDetailContent"></div>
      </div>
    </div>
  `;

  // Khởi tạo render
  const searchInput = document.getElementById("tripSearch");
  const chipButtons = Array.from(document.querySelectorAll(".chips-row .chip"));
  let currentStatusFilter = "ALL";

  renderTripList(currentStatusFilter, "");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value || "";
      renderTripList(currentStatusFilter, term);
    });
  }

  chipButtons.forEach((chip) => {
    chip.addEventListener("click", () => {
      chipButtons.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");

      currentStatusFilter = chip.dataset.status || "ALL";
      const term = searchInput ? searchInput.value : "";
      renderTripList(currentStatusFilter, term);
    });
  });
}

// ===== Render Trips Page (được gọi từ dashboard.js) =====
function renderTripsPage() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `
    <div class="trip-layout" style="position: fixed; top: 0; left: 220px; right: 0; bottom: 0; display: flex;">
      <!-- SIDEBAR TRIP -->
      <section class="trip-sidebar">
        <header class="trip-sidebar-header">
          <div>
            <h1>Tracking trips</h1>
            <p>Theo dõi các chuyến giao hàng trong khu vực</p>
          </div>
        </header>

        <div class="trip-sidebar-filters">
          <div class="search-wrapper">
            <input
              id="tripSearch"
              class="input search-input"
              placeholder="Tìm Trip ID, tình nguyện viên…"
            />
          </div>
          <div class="chips-row">
            <button class="chip chip-active" data-status="ALL">All</button>
            <button class="chip" data-status="Planned">Planned</button>
            <button class="chip" data-status="InProcess">In Process</button>
            <button class="chip" data-status="Completed">Completed</button>
            <button class="chip" data-status="Cancelled">Cancelled</button>
          </div>
        </div>

        <div id="tripList" class="trip-list">
          <!-- JS render danh sách trip -->
        </div>
      </section>

      <!-- PANEL CHI TIẾT + MAP -->
      <section class="trip-detail">
        <!-- Thanh tiêu đề Trip -->
        <header class="trip-detail-header">
          <div>
            <div class="trip-detail-label">Đang theo dõi</div>
            <div class="trip-detail-title">
              Trip <span id="detailTripId">–</span>
              <span id="detailTripStatus" class="status-pill">–</span>
            </div>
          </div>
          <div class="trip-detail-actions">
            <button class="icon-btn" title="Gọi TNV">📞</button>
            <button class="icon-btn" title="Chat">💬</button>
            <button class="icon-btn" title="Xem docs">📄</button>
          </div>
        </header>

        <!-- Nội dung chi tiết + map -->
        <div class="trip-detail-body">
          <!-- Cột timeline + load info -->
          <div class="trip-timeline">
            <div class="timeline-tabs">
              <button class="tab tab-active" data-tab="tracking">Tracking</button>
              <button class="tab" data-tab="load">Load info</button>
            </div>

            <!-- Panel: Tracking (3 mốc chính) -->
            <div id="trackingPanel" class="timeline-panel">
              <ul class="timeline-list">
                <li class="timeline-item">
                  <div class="timeline-dot timeline-dot-primary"></div>
                  <div class="timeline-content">
                    <div class="timeline-title">Pick up</div>
                    <div id="pickupAddress" class="timeline-text"></div>
                    <div id="pickupTime" class="timeline-time"></div>
                  </div>
                </li>
                <li class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-title">In sorting centre</div>
                    <div id="sortingAddress" class="timeline-text"></div>
                    <div id="sortingTime" class="timeline-time"></div>
                  </div>
                </li>
                <li class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-title">Delivered</div>
                    <div id="deliveredAddress" class="timeline-text"></div>
                    <div id="deliveredTime" class="timeline-time"></div>
                  </div>
                </li>
              </ul>

              <div class="trip-meta">
                <div><span>Volunteer:</span> <span id="detailVolunteer">–</span></div>
                <div><span>Campaign:</span> <span id="detailCampaign">–</span></div>
                <div><span>Warehouse:</span> <span id="detailWarehouse">–</span></div>
                <div><span>Distance:</span> <span id="detailDistance">–</span></div>
              </div>
            </div>

            <!-- Panel: Load info – GPS log 2 phút/lần -->
            <div id="loadInfoPanel" class="timeline-panel" style="display:none;">
              <div class="gps-header">
                <h3>Lộ trình chi tiết (GPS log)</h3>
                <span id="gpsSummary" class="gps-summary"></span>
              </div>

              <div class="gps-table-wrapper">
                <table class="gps-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Thời gian</th>
                      <th>Lat</th>
                      <th>Lng</th>
                      <th>Địa chỉ</th>
                      <th>Tốc độ</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody id="gpsLogTableBody">
                    <!-- JS render GPS log -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Cột map -->
          <div class="trip-map-wrapper">
            <div class="map-toolbar">
              <button class="map-btn map-btn-active">Map</button>
            </div>
            <div id="map" class="map"></div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Khởi tạo render
  initTripPage();
}

function initTripPage() {
  const searchInput = document.getElementById("tripSearch");
  const chipButtons = Array.from(document.querySelectorAll(".chips-row .chip"));
  let currentStatusFilter = "ALL";

  renderTripList(currentStatusFilter, "");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value || "";
      renderTripList(currentStatusFilter, term);
    });
  }

  chipButtons.forEach((chip) => {
    chip.addEventListener("click", () => {
      chipButtons.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");

      currentStatusFilter = chip.dataset.status || "ALL";
      const term = searchInput ? searchInput.value : "";
      renderTripList(currentStatusFilter, term);
    });
  });

  // Tabs Tracking / Load info
  const tabButtons = Array.from(document.querySelectorAll(".timeline-tabs .tab"));
  const trackingPanel = document.getElementById("trackingPanel");
  const loadPanel = document.getElementById("loadInfoPanel");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("tab-active"));
      tab.classList.add("tab-active");

      if (!trackingPanel || !loadPanel) return;

      const tabName = tab.dataset.tab;
      if (tabName === "load") {
        trackingPanel.style.display = "none";
        loadPanel.style.display = "block";
      } else {
        trackingPanel.style.display = "block";
        loadPanel.style.display = "none";
      }

      // đổi mode map theo tab
      if (currentTrip) {
        const mode = tabName === "load" ? "load" : "tracking";
        updateMap(currentTrip, mode);
      }
    });
  });
}

// ===== Khởi động khi DOM sẵn sàng =====
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("tripSearch");
  const chipButtons = Array.from(
    document.querySelectorAll(".chips-row .chip")
  );

  let currentStatusFilter = "ALL";

  // render lần đầu
  renderTripList(currentStatusFilter, "");

  // search
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value || "";
      renderTripList(currentStatusFilter, term);
    });
  }

  // filter trạng thái
  chipButtons.forEach((chip) => {
    chip.addEventListener("click", () => {
      chipButtons.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");

      currentStatusFilter = chip.dataset.status || "ALL";
      const term = searchInput ? searchInput.value : "";
      renderTripList(currentStatusFilter, term);
    });
  });

  // Tabs Tracking / Load info
  const tabButtons = Array.from(
    document.querySelectorAll(".timeline-tabs .tab")
  );
  const trackingPanel = document.getElementById("trackingPanel");
  const loadPanel = document.getElementById("loadInfoPanel");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("tab-active"));
      tab.classList.add("tab-active");

      if (!trackingPanel || !loadPanel) return;

      const tabName = tab.dataset.tab;
      if (tabName === "load") {
        trackingPanel.style.display = "none";
        loadPanel.style.display = "block";
      } else {
        trackingPanel.style.display = "block";
        loadPanel.style.display = "none";
      }

      // đổi mode map theo tab
      if (currentTrip) {
        const mode = tabName === "load" ? "load" : "tracking";
        updateMap(currentTrip, mode);
      }
    });
  });

  // Nút Add trip ở admin chỉ là demo; trong for_CL/trip.html đã bỏ nút này,
  // nên đoạn code dưới đây không làm gì (btnAddTrip = null).
  const btnAddTrip = document.getElementById("btnAddTrip");
  if (btnAddTrip) {
    btnAddTrip.addEventListener("click", () => {
      alert("Demo: nút này sau này sẽ bật form tạo Trip mới.");
    });
  }
});
