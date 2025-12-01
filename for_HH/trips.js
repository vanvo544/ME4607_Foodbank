// ===== Demo data Trips cho Household =====
const householdTrips = [
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
    deliveredAddress: "Hộ Trần Văn Hùng, Q. Thủ Đức",
    deliveredTime: "ETA 15.08.2025 • 10:45 AM",
    routePoints: [
      { lat: 10.8535, lng: 106.7517, label: "Kho WH_0001 – Thủ Đức" },
      { lat: 10.8671, lng: 106.7825, label: "Điểm tập kết Linh Trung" },
      { lat: 10.8715, lng: 106.7879, label: "Hộ Trần Văn Hùng" },
    ],
    gpsLogs: [
      {
        seq: 1,
        time: "15.08.2025 • 09:10",
        lat: 10.8535,
        lng: 106.7517,
        address: "Kho WH_0001, P. Linh Trung, TP. Thủ Đức",
        speed: 0,
        status: "Đang lấy hàng",
      },
      {
        seq: 2,
        time: "15.08.2025 • 09:12",
        lat: 10.8560,
        lng: 106.7565,
        address: "QL1A, P. Linh Trung, TP. Thủ Đức",
        speed: 25,
        status: "Đang di chuyển",
      },
      {
        seq: 3,
        time: "15.08.2025 • 09:14",
        lat: 10.8605,
        lng: 106.7650,
        address: "Cầu vượt Linh Xuân",
        speed: 18,
        status: "Đang di chuyển (kẹt nhẹ)",
      },
      {
        seq: 4,
        time: "15.08.2025 • 09:16",
        lat: 10.8671,
        lng: 106.7825,
        address: "Điểm tập kết Linh Trung",
        speed: 0,
        status: "Đã đến điểm tập kết",
      },
      {
        seq: 5,
        time: "15.08.2025 • 09:18",
        lat: 10.8688,
        lng: 106.7842,
        address: "Đường số 5, Linh Trung",
        speed: 22,
        status: "Đang di chuyển",
      },
      {
        seq: 6,
        time: "15.08.2025 • 09:20",
        lat: 10.8715,
        lng: 106.7879,
        address: "Hộ Trần Văn Hùng, Q. Thủ Đức",
        speed: 5,
        status: "Đang giao",
      },
    ],
    progress: 0.6,
  },
  {
    id: "#1248F9A0",
    status: "Completed",
    volunteer: "VL_9100888888 – Trần Mai Hương",
    campaign: "CP_2025001 – Mái ấm Nhật Hồng",
    warehouse: "WH_0002 – Kho Quận 4",
    distanceKm: 4.2,
    pickupAddress: "Kho WH_0002, P.8, Quận 4",
    pickupTime: "15.08.2025 • 07:15 AM",
    sortingAddress: "Điểm trung chuyển P.8, Quận 4",
    sortingTime: "15.08.2025 • 07:30 AM",
    deliveredAddress: "Hộ Trần Văn Hùng, Q.4",
    deliveredTime: "15.08.2025 • 08:05 AM",
    routePoints: [
      { lat: 10.7626, lng: 106.7083, label: "Kho WH_0002 – Quận 4" },
      { lat: 10.7639, lng: 106.7035, label: "Điểm trung chuyển P.8, Q.4" },
      { lat: 10.767, lng: 106.7065, label: "Hộ Trần Văn Hùng" },
    ],
    gpsLogs: [
      {
        seq: 1,
        time: "15.08.2025 • 07:15",
        lat: 10.7626,
        lng: 106.7083,
        address: "Kho WH_0002, Quận 4",
        speed: 0,
        status: "Đã lấy hàng",
      },
      {
        seq: 2,
        time: "15.08.2025 • 07:17",
        lat: 10.7630,
        lng: 106.7065,
        address: "Đường Khánh Hội, Q.4",
        speed: 20,
        status: "Đang di chuyển",
      },
      {
        seq: 3,
        time: "15.08.2025 • 07:19",
        lat: 10.7639,
        lng: 106.7035,
        address: "Điểm trung chuyển P.8, Q.4",
        speed: 0,
        status: "Đã đến điểm trung chuyển",
      },
      {
        seq: 4,
        time: "15.08.2025 • 07:21",
        lat: 10.7655,
        lng: 106.7048,
        address: "Đường Hoàng Diệu, Q.4",
        speed: 18,
        status: "Đang di chuyển",
      },
      {
        seq: 5,
        time: "15.08.2025 • 07:23",
        lat: 10.767,
        lng: 106.7065,
        address: "Hộ Trần Văn Hùng, Q.4",
        speed: 3,
        status: "Đã giao xong",
      },
    ],
    progress: 1.0,
  },
  {
    id: "#9980F145",
    status: "Planned",
    volunteer: "Chưa gán",
    campaign: "CP_2025002 – Hỗ trợ mùa mưa 2025",
    warehouse: "WH_0003 – Kho Bình Tân",
    distanceKm: 8.0,
    pickupAddress: "Kho WH_0003, Bình Tân",
    pickupTime: "Dự kiến 01.09.2025 • 02:00 PM",
    sortingAddress: "Điểm tập kết P. Bình Hưng Hòa",
    sortingTime: "01.09.2025 • 02:20 PM",
    deliveredAddress: "Hộ Trần Văn Hùng, Bình Tân",
    deliveredTime: "01.09.2025 • 03:00 PM",
    routePoints: [
      { lat: 10.765, lng: 106.603, label: "Kho WH_0003 – Bình Tân" },
      { lat: 10.7659, lng: 106.6195, label: "Điểm tập kết Bình Tân" },
      { lat: 10.77, lng: 106.63, label: "Hộ Trần Văn Hùng" },
    ],
    gpsLogs: [
      {
        seq: 1,
        time: "01.09.2025 • 02:00",
        lat: 10.765,
        lng: 106.603,
        address: "Kho WH_0003, Bình Tân",
        speed: 0,
        status: "Dự kiến xuất phát",
      },
    ],
    progress: 0.1,
  },
];

let currentTrip = null;
let map = null;
let mapLayer = null;

function initMapTrips() {
  if (document.getElementById("tripMap")) {
    map = L.map("tripMap").setView([10.77, 106.7], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    mapLayer = L.layerGroup().addTo(map);
  }
}

function prettyTripStatus(status) {
  const mapping = {
    Planned: "📋 Dự kiến",
    InProcess: "🚚 Đang giao",
    Completed: "✓ Hoàn thành",
    Cancelled: "✗ Hủy",
  };
  return mapping[status] || status;
}

// ===== Render Trips Page =====
function renderTripsPage() {
  const contentArea = document.getElementById("contentArea");

  contentArea.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr; gap: 16px; height: calc(100vh - 140px);">
      <!-- Chi tiết trip + map -->
      <div class="panel" style="display: flex; flex-direction: column; height: 100%; overflow: hidden;">
        <div style="margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <h2 class="panel-title" style="margin: 0;">
              Chuyến <span id="selectedTripId">–</span>
              <span id="selectedTripStatus" class="status-pill" style="margin-left: 8px;">–</span>
            </h2>
          </div>
          <p id="selectedTripDetail" style="margin: 0; font-size: 0.85rem; color: #6b7280;"></p>
        </div>

        <!-- Tabs: List / Tracking / Map / Load info -->
        <div style="display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; overflow-x: auto;">
          <button class="tab-btn tab-btn-active" onclick="switchTripTab('list')" data-tab="list" style="padding: 6px 12px; border-radius: 6px; background: #111827; color: #f9fafb; border: none; cursor: pointer; font-size: 0.85rem; white-space: nowrap;">
            📋 Danh sách
          </button>
          <button class="tab-btn" onclick="switchTripTab('tracking')" data-tab="tracking" style="padding: 6px 12px; border-radius: 6px; background: transparent; color: #6b7280; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.85rem; white-space: nowrap;">
            📍 Tracking
          </button>
          <button class="tab-btn" onclick="switchTripTab('load')" data-tab="load" style="padding: 6px 12px; border-radius: 6px; background: transparent; color: #6b7280; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.85rem; white-space: nowrap;">
            📊 GPS Log
          </button>
          <button class="tab-btn" onclick="switchTripTab('map')" data-tab="map" style="padding: 6px 12px; border-radius: 6px; background: transparent; color: #6b7280; border: 1px solid #e5e7eb; cursor: pointer; font-size: 0.85rem; white-space: nowrap;">
            🗺️ Bản đồ
          </button>
        </div>

        <!-- List panel -->
        <div id="tripListPanel" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
          <div style="margin-bottom: 12px;">
            <input 
              id="tripSearch" 
              class="input" 
              placeholder="Tìm Mã chuyến..." 
              style="width: 100%;"
            />
          </div>
          <div id="tripListContainer" style="display: flex; flex-direction: column; gap: 8px;">
            <!-- JS render danh sách trips -->
          </div>
        </div>

        <!-- Tracking panel -->
        <div id="tripTrackingPanel" style="flex: 1; overflow-y: auto; display: none; flex-direction: column; gap: 12px;">
          <ul id="tripTimeline" style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px;">
            <!-- JS render timeline -->
          </ul>

          <div id="tripMeta" style="padding: 12px; background: #f9fafb; border-radius: 8px; font-size: 0.85rem; color: #4b5563; display: flex; flex-direction: column; gap: 6px;">
            <!-- JS render meta info -->
          </div>
        </div>

        <!-- Load info GPS panel -->
        <div id="tripLoadPanel" style="flex: 1; overflow-y: auto; display: none; flex-direction: column; gap: 12px;">
          <div style="padding: 12px; background: #f9fafb; border-radius: 8px;">
            <h3 style="margin: 0 0 8px; font-size: 0.9rem; font-weight: 600;">📊 Lộ Trình Chi Tiết (GPS Log)</h3>
            <p id="gpsSummary" style="margin: 0; font-size: 0.8rem; color: #6b7280;"></p>
          </div>

          <div class="table-wrapper" style="flex: 1;">
            <table class="table" style="font-size: 0.8rem;">
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

        <!-- Map panel -->
        <div id="tripMapPanel" style="flex: 1; overflow: hidden; display: none; border-radius: 8px;">
          <div id="tripMap" style="width: 100%; height: 100%;"></div>
        </div>
      </div>
    </div>
  `;

  renderTripsList();
  setupTripListeners();
  initMapTrips();

  // Select first trip by default
  if (householdTrips.length > 0) {
    selectTrip(householdTrips[0].id);
  }
}

function renderTripsList() {
  const container = document.getElementById("tripListContainer");
  container.innerHTML = "";

  householdTrips.forEach((trip) => {
    const statusClass = `status-${trip.status}`;
    const statusText = prettyTripStatus(trip.status);

    const card = document.createElement("div");
    card.className = "trip-card";
    card.dataset.tripId = trip.id;
    card.onclick = () => selectTrip(trip.id);
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 600; font-size: 0.9rem;">${trip.id}</span>
        <span class="status-pill ${statusClass}" style="font-size: 0.7rem;">${statusText}</span>
      </div>
      <div style="font-size: 0.8rem; color: #6b7280; margin-bottom: 4px;">
        ${trip.volunteer || "Chưa gán"}
      </div>
      <div style="height: 3px; background: #f3f4f6; border-radius: 999px; overflow: hidden;">
        <div style="height: 100%; background: linear-gradient(90deg, #22c55e, #facc15); width: ${
          trip.progress * 100
        }%;"></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function selectTrip(tripId) {
  const trip = householdTrips.find((t) => t.id === tripId);
  if (!trip) return;

  currentTrip = trip;

  // Highlight card
  document.querySelectorAll(".trip-card").forEach((card) => {
    card.style.borderColor = card.dataset.tripId === tripId ? "#facc15" : "#e5e7eb";
    card.style.background =
      card.dataset.tripId === tripId ? "#fffbeb" : "#ffffff";
  });

  // Update header
  document.getElementById("selectedTripId").textContent = trip.id;
  const statusSpan = document.getElementById("selectedTripStatus");
  statusSpan.textContent = prettyTripStatus(trip.status);
  statusSpan.className = `status-pill status-${trip.status}`;

  document.getElementById("selectedTripDetail").textContent = `${trip.campaign}`;

  // Render tracking info
  renderTripTracking(trip);

  // Render GPS log
  renderGpsLog(trip);

  // Update map
  updateTripMap(trip);
}

function renderTripTracking(trip) {
  const timeline = document.getElementById("tripTimeline");
  timeline.innerHTML = `
    <li style="display: flex; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid #f3f4f6;">
      <div style="width: 12px; height: 12px; border-radius: 999px; background: #1d4ed8; margin-top: 4px; flex-shrink: 0;"></div>
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 0.9rem;">Lấy hàng</div>
        <div style="color: #6b7280; font-size: 0.8rem;">${trip.pickupAddress}</div>
        <div style="color: #9ca3af; font-size: 0.75rem;">${trip.pickupTime}</div>
      </div>
    </li>
    <li style="display: flex; gap: 12px; padding-bottom: 8px; border-bottom: 1px solid #f3f4f6;">
      <div style="width: 12px; height: 12px; border-radius: 999px; background: #e5e7eb; margin-top: 4px; flex-shrink: 0;"></div>
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 0.9rem;">Tập kết</div>
        <div style="color: #6b7280; font-size: 0.8rem;">${trip.sortingAddress}</div>
        <div style="color: #9ca3af; font-size: 0.75rem;">${trip.sortingTime}</div>
      </div>
    </li>
    <li style="display: flex; gap: 12px;">
      <div style="width: 12px; height: 12px; border-radius: 999px; background: #e5e7eb; margin-top: 4px; flex-shrink: 0;"></div>
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 0.9rem;">Giao hàng</div>
        <div style="color: #6b7280; font-size: 0.8rem;">${trip.deliveredAddress}</div>
        <div style="color: #9ca3af; font-size: 0.75rem;">${trip.deliveredTime}</div>
      </div>
    </li>
  `;

  const meta = document.getElementById("tripMeta");
  meta.innerHTML = `
    <div style="display: flex; gap: 12px; align-items: center;">
      <span style="font-weight: 600; min-width: 100px;">Tình nguyện viên:</span>
      <span>${trip.volunteer || "Chưa gán"}</span>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <span style="font-weight: 600; min-width: 100px;">Kho:</span>
      <span>${trip.warehouse}</span>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <span style="font-weight: 600; min-width: 100px;">Khoảng cách:</span>
      <span>${trip.distanceKm} km</span>
    </div>
  `;
}

function updateTripMap(trip) {
  if (!map || !mapLayer || !trip) return;

  mapLayer.clearLayers();
  const latlngs = [];

  trip.routePoints.forEach((point, idx) => {
    latlngs.push([point.lat, point.lng]);

    const iconColor = idx === 0 ? "#1d4ed8" : idx === trip.routePoints.length - 1 ? "#15803d" : "#f97316";
    const marker = L.circleMarker([point.lat, point.lng], {
      radius: 8,
      fillColor: iconColor,
      color: "#ffffff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    })
      .bindPopup(point.label)
      .addTo(mapLayer);
  });

  // Draw polyline
  if (latlngs.length > 0) {
    L.polyline(latlngs, {
      color: "#facc15",
      weight: 3,
      opacity: 0.8,
      dashArray: "5, 5",
    }).addTo(mapLayer);

    // Fit bounds
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [50, 50] });
  }
}

// ===== Render GPS log trong tab Load info =====
function renderGpsLog(trip) {
  const tbody = document.getElementById("gpsLogTableBody");
  if (!tbody) return;

  const logs = (trip.gpsLogs || []).slice();
  tbody.innerHTML = "";

  logs.sort((a, b) => (a.seq || 0) - (b.seq || 0));

  logs.forEach((log) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${log.seq}</td>
      <td>${log.time || ""}</td>
      <td>${log.lat != null ? log.lat.toFixed(4) : ""}</td>
      <td>${log.lng != null ? log.lng.toFixed(4) : ""}</td>
      <td style="max-width: 150px; word-break: break-word; font-size: 0.75rem;">${log.address || ""}</td>
      <td>${log.speed != null ? log.speed : ""}</td>
      <td>${log.status || ""}</td>
    `;
    tbody.appendChild(tr);
  });

  const summary = document.getElementById("gpsSummary");
  if (summary) {
    if (!logs.length) {
      summary.textContent = "Chưa có GPS log cho trip này";
    } else {
      const first = logs[0];
      const last = logs[logs.length - 1];
      summary.textContent = `${logs.length} điểm GPS • từ ${first.time} đến ${last.time}`;
    }
  }
}

function switchTripTab(tab) {
  const listPanel = document.getElementById("tripListPanel");
  const trackingPanel = document.getElementById("tripTrackingPanel");
  const loadPanel = document.getElementById("tripLoadPanel");
  const mapPanel = document.getElementById("tripMapPanel");

  // Hide all panels
  listPanel.style.display = "none";
  trackingPanel.style.display = "none";
  loadPanel.style.display = "none";
  mapPanel.style.display = "none";

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    if (btn.dataset.tab === tab) {
      btn.style.background = "#111827";
      btn.style.color = "#f9fafb";
      btn.style.border = "none";
    } else {
      btn.style.background = "transparent";
      btn.style.color = "#6b7280";
      btn.style.border = "1px solid #e5e7eb";
    }
  });

  // Show selected panel
  if (tab === "list") {
    listPanel.style.display = "flex";
  } else if (tab === "tracking") {
    trackingPanel.style.display = "flex";
  } else if (tab === "load") {
    loadPanel.style.display = "flex";
  } else if (tab === "map") {
    mapPanel.style.display = "block";
    if (map && currentTrip) {
      setTimeout(() => {
        map.invalidateSize();
        updateTripMap(currentTrip);
      }, 0);
    }
  }
}

function setupTripListeners() {
  document
    .getElementById("tripSearch")
    .addEventListener("input", (e) => {
      const search = e.target.value.toLowerCase();
      document.querySelectorAll(".trip-card").forEach((card) => {
        const tripId = card.dataset.tripId;
        const visible = tripId.toLowerCase().includes(search);
        card.style.display = visible ? "block" : "none";
      });
    });
}
