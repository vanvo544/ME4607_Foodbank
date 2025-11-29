// ===== Demo data cho Trip =====
// Bạn có thể thay bằng dữ liệu thật từ backend sau này

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
    // route points cho OpenStreetMap
    routePoints: [
      {
        lat: 10.8535,
        lng: 106.7517,
        label: "Kho WH_0001 – Thủ Đức",
      },
      {
        lat: 10.8671,
        lng: 106.7825,
        label: "Điểm tập kết Linh Trung",
      },
      {
        lat: 10.8715,
        lng: 106.7879,
        label: "HH_9100401357 – Mai Ánh Hồng",
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
      {
        lat: 10.7626,
        lng: 106.7083,
        label: "Kho WH_0002 – Quận 4",
      },
      {
        lat: 10.7639,
        lng: 106.7035,
        label: "Điểm trung chuyển P.8, Q.4",
      },
      {
        lat: 10.767,
        lng: 106.7065,
        label: "HH_9100402000 – Trần Văn Hùng",
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
      {
        lat: 10.765,
        lng: 106.603,
        label: "Kho WH_0003 – Bình Tân",
      },
      {
        lat: 10.7659,
        lng: 106.6195,
        label: "Điểm tập kết Bình Tân",
      },
      {
        lat: 10.77,
        lng: 106.63,
        label: "HH_9100508888 – Nguyễn Văn B",
      },
    ],
    progress: 0.1,
  },
];

let map;
let mapLayer;

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

// ===== Chọn trip, cập nhật detail & map =====
function selectTrip(id) {
  const trip = trips.find((t) => t.id === id);
  if (!trip) return;

  // highlight card
  document
    .querySelectorAll(".trip-card")
    .forEach((c) => c.classList.toggle("active", c.dataset.id === id));

  // header
  document.getElementById("detailTripId").textContent = trip.id;
  const statusSpan = document.getElementById("detailTripStatus");
  statusSpan.textContent = prettyStatus(trip.status);
  statusSpan.className = `status-pill status-${trip.status}`;

  // timeline text
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

  // map
  updateMap(trip);
}

function updateMap(trip) {
  mapLayer.clearLayers();

  const latlngs = [];

  (trip.routePoints || []).forEach((pt, idx) => {
    const latlng = [pt.lat, pt.lng];
    latlngs.push(latlng);

    L.marker(latlng)
      .addTo(mapLayer)
      .bindPopup(
        `<b>${idx === 0 ? "Warehouse" : idx === latlngs.length - 1 ? "Household" : "Checkpoint"}</b><br/>${pt.label}`
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
  document.getElementById("tripSearch").addEventListener("input", applyFilters);

  // chips status
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) =>
        c.classList.remove("chip-active")
      );
      chip.classList.add("chip-active");
      applyFilters();
    });
  });

  // Nút Add trip chỉ demo
  document.getElementById("btnAddTrip").addEventListener("click", () => {
    alert("Demo: nút này sau này sẽ bật form tạo Trip mới.");
  });
});
