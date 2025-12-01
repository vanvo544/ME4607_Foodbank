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
    deliveredAddress: "Hộ HH_9100401357 – Mai Ánh Hồng, Q. Thủ Đức",
    deliveredTime: "ETA 15.08.2025 • 10:45 AM",

    // route points cho Tracking (3 mốc chính)
    routePoints: [
      { lat: 10.8535, lng: 106.7517, label: "Kho WH_0001 – Thủ Đức" },
      { lat: 10.8671, lng: 106.7825, label: "Điểm tập kết Linh Trung" },
      { lat: 10.8715, lng: 106.7879, label: "HH_9100401357 – Mai Ánh Hồng" },
    ],

    // GPS log: cứ 2 phút một điểm
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
        address: "HH_9100401357 – Mai Ánh Hồng, Q. Thủ Đức",
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
    deliveredAddress: "HH_9100402000 – Trần Văn Hùng, Q.4",
    deliveredTime: "15.08.2025 • 08:05 AM",
    routePoints: [
      { lat: 10.7626, lng: 106.7083, label: "Kho WH_0002 – Quận 4" },
      { lat: 10.7639, lng: 106.7035, label: "Điểm trung chuyển P.8, Q.4" },
      { lat: 10.767, lng: 106.7065, label: "HH_9100402000 – Trần Văn Hùng" },
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
        address: "HH_9100402000 – Trần Văn Hùng, Q.4",
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
    deliveredAddress: "HH_9100508888 – Nguyễn Văn B, Bình Tân",
    deliveredTime: "01.09.2025 • 03:00 PM",
    routePoints: [
      { lat: 10.765, lng: 106.603, label: "Kho WH_0003 – Bình Tân" },
      { lat: 10.7659, lng: 106.6195, label: "Điểm tập kết Bình Tân" },
      { lat: 10.77, lng: 106.63, label: "HH_9100508888 – Nguyễn Văn B" },
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
      // ... thêm các điểm dự kiến khác nếu cần
    ],
    progress: 0.1,
  },
];

let map;
let mapLayer;
let currentTrip = null; // để biết đang xem Trip nào

// ===== Khởi tạo map OSM =====
function initMap() {
  map = L.map("map").setView([10.77, 106.7], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  mapLayer = L.layerGroup().addTo(map);
}

// ===== Render danh sách trip ở sidebar =====
function renderTripList(list) {
  const container = document.getElementById("tripList");
  container.innerHTML = "";

  list.forEach((trip) => {
    const card = document.createElement("div");
    card.className = "trip-card";
    card.dataset.id = trip.id;

    const progressPercent = Math.round((trip.progress || 0) * 100);

    card.innerHTML = `
      <div class="trip-card-header">
        <span class="trip-id">${trip.id}</span>
        <span class="status-pill status-${trip.status}">
          ${prettyStatus(trip.status)}
        </span>
      </div>
      <div class="trip-card-body">
        <div>${trip.warehouse}</div>
        <div>${trip.volunteer}</div>
        <div class="trip-progress">
          <div class="trip-progress-bar" style="width:${progressPercent}%;"></div>
        </div>
        <div>Distance: ${trip.distanceKm} km</div>
      </div>
    `;

    card.addEventListener("click", () => selectTrip(trip.id));

    container.appendChild(card);
  });
}

function prettyStatus(status) {
  if (status === "Planned") return "Planned";
  if (status === "InProcess") return "In Process";
  if (status === "Completed") return "Completed";
  if (status === "Cancelled") return "Cancelled";
  return status;
}

// ===== Render GPS log trong tab Load info =====
function renderGpsLog(trip) {
  const tbody = document.getElementById("gpsLogTableBody");
  if (!tbody) return;

  const logs = (trip.gpsLogs || []).slice(); // copy
  tbody.innerHTML = "";

  // sort theo seq (phòng khi backend trả không theo thứ tự)
  logs.sort((a, b) => (a.seq || 0) - (b.seq || 0));

  logs.forEach((log) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${log.seq}</td>
      <td>${log.time || ""}</td>
      <td>${log.lat != null ? log.lat.toFixed(5) : ""}</td>
      <td>${log.lng != null ? log.lng.toFixed(5) : ""}</td>
      <td>${log.address || ""}</td>
      <td>${log.speed != null ? log.speed : ""}</td>
      <td>${log.status || ""}</td>
    `;
    tbody.appendChild(tr);
  });

  const summary = document.getElementById("gpsSummary");
  if (summary) {
    if (!logs.length) {
      summary.textContent = "Chưa có GPS log cho Trip này";
    } else {
      const first = logs[0];
      const last = logs[logs.length - 1];
      summary.textContent = `${logs.length} điểm GPS • từ ${first.time} đến ${last.time}`;
    }
  }
}

// ===== Chọn trip, cập nhật detail & map =====
function selectTrip(id) {
  const trip = trips.find((t) => t.id === id);
  if (!trip) return;
  currentTrip = trip;

  // highlight card
  document
    .querySelectorAll(".trip-card")
    .forEach((c) => c.classList.toggle("active", c.dataset.id === id));

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
  document.getElementById("deliveredTime").textContent = trip.deliveredTime;

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

// ===== Cập nhật map theo mode =====
// mode = "tracking"  => routePoints + polyline
// mode = "load"      => tất cả gpsLogs là chấm tròn
function updateMap(trip, mode = "tracking") {
  if (!map || !mapLayer || !trip) return;

  mapLayer.clearLayers();
  const latlngs = [];

  if (mode === "load" && trip.gpsLogs && trip.gpsLogs.length) {
    // Vẽ từng điểm GPS log
    const logs = trip.gpsLogs.slice().sort((a, b) => (a.seq || 0) - (b.seq || 0));

    logs.forEach((log) => {
      if (log.lat == null || log.lng == null) return;
      const latlng = [log.lat, log.lng];
      latlngs.push(latlng);

      // Một log = một chấm tròn
      L.circleMarker(latlng)
        .addTo(mapLayer)
        .bindPopup(
          `<b>${log.time || ""}</b><br/>${log.address || ""}<br/>Tốc độ: ${
            log.speed != null ? log.speed + " km/h" : "N/A"
          }<br/>${log.status || ""}`
        );
    });

    // Fit bounds theo toàn bộ điểm GPS
    if (latlngs.length > 1) {
      map.fitBounds(latlngs, { padding: [20, 20] });
    } else if (latlngs.length === 1) {
      map.setView(latlngs[0], 15);
    }
  } else {
    // Tracking mode: vẽ 3 điểm chính + polyline
    (trip.routePoints || []).forEach((pt, idx, arr) => {
      if (pt.lat == null || pt.lng == null) return;
      const latlng = [pt.lat, pt.lng];
      latlngs.push(latlng);

      L.marker(latlng)
        .addTo(mapLayer)
        .bindPopup(
          `<b>${
            idx === 0
              ? "Warehouse"
              : idx === arr.length - 1
              ? "Household"
              : "Checkpoint"
          }</b><br/>${pt.label}`
        );
    });

    if (latlngs.length > 1) {
      L.polyline(latlngs, {
        color: "#2563eb",
        weight: 4,
      }).addTo(mapLayer);

      map.fitBounds(latlngs, { padding: [20, 20] });
    } else if (latlngs.length === 1) {
      map.setView(latlngs[0], 13);
    }
  }
}

// ===== Filter theo search & status =====
function applyFilters() {
  const searchText = document
    .getElementById("tripSearch")
    .value.toLowerCase()
    .trim();
  const activeChip = document.querySelector(".chip-active");
  const statusFilter = activeChip ? activeChip.dataset.status : "ALL";

  const filtered = trips.filter((t) => {
    const matchSearch =
      !searchText ||
      t.id.toLowerCase().includes(searchText) ||
      (t.volunteer && t.volunteer.toLowerCase().includes(searchText));

  const matchStatus =
      statusFilter === "ALL" ? true : t.status === statusFilter;

    return matchSearch && matchStatus;
  });

  renderTripList(filtered);
  if (filtered.length > 0) {
    selectTrip(filtered[0].id);
  }
}

// ===== Khởi động =====
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderTripList(trips);
  if (trips.length > 0) selectTrip(trips[0].id);

  // search
  const searchInput = document.getElementById("tripSearch");
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // chips status
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document
        .querySelectorAll(".chip")
        .forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      applyFilters();
    });
  });

  // Tabs Tracking / Load info
  const tabButtons = document.querySelectorAll(".timeline-tabs .tab");
  const trackingPanel = document.getElementById("trackingPanel");
  const loadPanel = document.getElementById("loadInfoPanel");

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabButtons.forEach((t) => t.classList.remove("tab-active"));
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

  // Nút Add trip chỉ demo
  const btnAddTrip = document.getElementById("btnAddTrip");
  if (btnAddTrip) {
    btnAddTrip.addEventListener("click", () => {
      alert("Demo: nút này sau này sẽ bật form tạo Trip mới.");
    });
  }
});
