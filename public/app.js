// app.js

// =============================
// Demo data – bạn có thể thay bằng dữ liệu từ API
// =============================
const demoOrders = [
  {
    id: "#1248F9A0",
    status: "Delivered",
    campaign: "CP_2025001",
    warehouse: "WH_0002",
    household: "HH_9100402000 – Hộ Trần Văn Hùng",
    volunteer: "VL_9100888888 – Trần Mai Hương (Xe máy)",
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
    warehouse: "WH_0001",
    household: "HH_9100401357 – Hộ Mai Ánh Hồng",
    volunteer: "VL_9100505678 – Nguyễn Văn An (Xe máy)",
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
    warehouse: "WH_0003",
    household: "HH_9100508888 – Hộ Nguyễn Văn B",
    volunteer: "Chưa gán",
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
    warehouse: "WH_0002",
    household: "HH_9100507777 – Hộ Lê Văn C",
    volunteer: "VL_9100123456 – Phạm Hoàng Nam (Xe máy)",
    created: "2025-11-23 16:32",
    accepted: "2025-11-23 16:40",
    delivery: "",
    completed: "",
    eta: "2025-11-23 21:36",
  },
];

const demoTrips = [
  {
    id: "RT_0001",
    status: "Delivered",
    volunteer: "VL_9100888888 – Trần Mai Hương",
    campaign: "CP_2025001",
    vehicle: "Xe máy – 59X3-12345",
    warehouse: {
      id: "WH_0002",
      name: "Kho Quận 4",
      lat: 10.762622,
      lng: 106.708252,
    },
    stops: [
      {
        type: "pickup",
        label: "Điểm tập kết P.8, Quận 4",
        lat: 10.7639,
        lng: 106.7035,
      },
      {
        type: "dropoff",
        label: "HH_9100402000 – Hộ Trần Văn Hùng",
        lat: 10.767,
        lng: 106.7065,
      },
    ],
    startTime: "07:15",
    distanceKm: 4.2,
  },
  {
    id: "RT_0002",
    status: "InTransit",
    volunteer: "VL_9100505678 – Nguyễn Văn An",
    campaign: "CP_2025001",
    vehicle: "Xe máy – 59X3-67890",
    warehouse: {
      id: "WH_0001",
      name: "Kho Thủ Đức",
      lat: 10.8535,
      lng: 106.7517,
    },
    stops: [
      {
        type: "pickup",
        label: "Điểm tập kết Linh Trung",
        lat: 10.8671,
        lng: 106.7825,
      },
      {
        type: "dropoff",
        label: "HH_9100401357 – Hộ Mai Ánh Hồng",
        lat: 10.8715,
        lng: 106.7879,
      },
    ],
    startTime: "09:05",
    distanceKm: 12.5,
  },
  {
    id: "RT_0003",
    status: "Upcoming",
    volunteer: "Chưa gán",
    campaign: "CP_2025002",
    vehicle: "Xe máy – chưa gán",
    warehouse: {
      id: "WH_0003",
      name: "Kho Bình Tân",
      lat: 10.765,
      lng: 106.603,
    },
    stops: [
      {
        type: "dropoff",
        label: "HH_9100508888 – Hộ Nguyễn Văn B",
        lat: 10.7659,
        lng: 106.6195,
      },
    ],
    startTime: "13:45 (dự kiến)",
    distanceKm: 8.0,
  },
];

// =============================
// Render bảng đơn hàng
// =============================

function renderOrders(orders) {
  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  orders.forEach((o) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${o.id}</td>
      <td>
        <div class="order-status">
          <span class="status-pill ${statusClass(o.status)}">${o.status}</span>
        </div>
      </td>
      <td>${o.campaign}</td>
      <td>
        <div>${o.warehouse}</div>
        <div style="font-size:0.75rem;color:#9ca3af;">→ ${o.household}</div>
      </td>
      <td>${o.volunteer || "<span style='color:#9ca3af'>Chưa gán</span>"}</td>
      <td>${o.created || "-"}</td>
      <td>${o.accepted || "-"}</td>
      <td>${o.delivery || "-"}</td>
      <td>${o.completed || "-"}</td>
      <td>${o.eta || "-"}</td>
    `;

    tbody.appendChild(tr);
  });
}

function statusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "delivered") return "status-delivered";
  if (s === "intransit") return "status-intransit";
  if (s === "upcoming") return "status-upcoming";
  return "";
}

// =============================
// Trip cards + map
// =============================

let map;
let mapLayerGroup;
let currentTripId = null;

function initMap() {
  // Khởi tạo map trung tâm ở HCM
  map = L.map("map").setView([10.77, 106.7], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  mapLayerGroup = L.layerGroup().addTo(map);
}

function renderTrips(trips) {
  const container = document.getElementById("tripList");
  container.innerHTML = "";

  trips.forEach((trip) => {
    const card = document.createElement("div");
    card.className = "trip-card";
    card.dataset.tripId = trip.id;

    card.innerHTML = `
      <div class="trip-card-header">
        <span class="trip-code">Trip ${trip.id}</span>
        <span class="trip-status trip-status-${trip.status}">
          ${trip.status}
        </span>
      </div>
      <div class="trip-meta">
        <div>${trip.warehouse.id} – ${trip.warehouse.name}</div>
        <div>Volunteer: ${
          trip.volunteer || "<span>Chưa gán</span>"
        }</div>
        <div>Start: ${trip.startTime} • Distance: ${trip.distanceKm} km</div>
      </div>
    `;

    card.addEventListener("click", () => selectTrip(trip.id));
    container.appendChild(card);
  });

  // Auto chọn trip đầu tiên
  if (trips.length > 0) {
    selectTrip(trips[0].id);
  }
}

function selectTrip(tripId) {
  currentTripId = tripId;

  document
    .querySelectorAll(".trip-card")
    .forEach((c) =>
      c.classList.toggle("active", c.dataset.tripId === String(tripId))
    );

  const trip = demoTrips.find((t) => t.id === tripId);
  if (!trip) return;

  updateMapForTrip(trip);
  updateRouteDetail(trip);
}

function updateMapForTrip(trip) {
  mapLayerGroup.clearLayers();

  const latlngs = [];

  // Warehouse
  if (trip.warehouse && trip.warehouse.lat && trip.warehouse.lng) {
    const whLatLng = [trip.warehouse.lat, trip.warehouse.lng];
    latlngs.push(whLatLng);
    L.marker(whLatLng)
      .addTo(mapLayerGroup)
      .bindPopup(
        `<b>${trip.warehouse.id}</b><br/>${trip.warehouse.name}<br/>Warehouse`
      );
  }

  // Stops
  (trip.stops || []).forEach((stop) => {
    const sLatLng = [stop.lat, stop.lng];
    latlngs.push(sLatLng);
    L.marker(sLatLng)
      .addTo(mapLayerGroup)
      .bindPopup(`${stop.label}<br/>${stop.type === "pickup" ? "Pickup" : "Dropoff"}`);
  });

  // Vẽ polyline
  if (latlngs.length > 1) {
    L.polyline(latlngs, {
      color: "#0ea5e9",
      weight: 4,
      opacity: 0.9,
    }).addTo(mapLayerGroup);
  }

  if (latlngs.length > 0) {
    map.fitBounds(latlngs, { padding: [20, 20] });
  }

  const label = document.getElementById("mapTripLabel");
  label.textContent = `Đang theo dõi: Trip ${trip.id}`;
}

// Thông tin chi tiết route bên dưới map
function updateRouteDetail(trip) {
  const container = document.getElementById("routeDetail");
  container.innerHTML = `
    <h3>Thông tin Route / Trip ${trip.id}</h3>
    <div class="route-detail-section">
      <div class="route-detail-section-title">Tổng quan</div>
      <div>Volunteer: ${trip.volunteer || "Chưa gán"}</div>
      <div>Campaign: ${trip.campaign}</div>
      <div>Phương tiện: ${trip.vehicle}</div>
      <div>Warehouse: ${trip.warehouse.id} – ${trip.warehouse.name}</div>
      <div>Start time: ${trip.startTime}</div>
      <div>Tổng quãng đường: ${trip.distanceKm} km</div>
    </div>
    <div class="route-detail-section">
      <div class="route-detail-section-title">Danh sách điểm dừng</div>
      <ul>
        ${trip.stops
          .map(
            (s, idx) =>
              `<li>${idx + 1}. ${
                s.type === "pickup" ? "Pickup" : "Dropoff"
              }: ${s.label}</li>`
          )
          .join("")}
      </ul>
    </div>
  `;
}

// =============================
// Drawer: tạo yêu cầu đơn hàng
// =============================

function openDrawer(id) {
  const drawer = document.getElementById(id);
  if (drawer) drawer.classList.add("open");
}

function closeDrawer(id) {
  const drawer = document.getElementById(id);
  if (drawer) drawer.classList.remove("open");
}

function initDrawerEvents() {
  // Mở drawer tạo order
  const btnCreateOrder = document.getElementById("btnCreateOrder");
  if (btnCreateOrder) {
    btnCreateOrder.addEventListener("click", () => openDrawer("drawerOrder"));
  }

  // Đóng drawer khi click overlay hoặc nút X / Hủy
  document.querySelectorAll("[data-close-drawer]").forEach((el) => {
    const id = el.getAttribute("data-close-drawer");
    el.addEventListener("click", () => closeDrawer(id));
  });

  // Submit form (demo – hiện chỉ log ra console)
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(orderForm);
      const data = Object.fromEntries(formData.entries());
      console.log("Đơn hàng mới (demo, chưa gửi backend):", data);
      alert("Demo: đã nhận thông tin đơn hàng mới trên giao diện.");
      closeDrawer("drawerOrder");
      orderForm.reset();
    });
  }
}

// =============================
// Khởi động khi load trang
// =============================

document.addEventListener("DOMContentLoaded", () => {
  // Nếu sau này có API, bạn có thể thay demoOrders/Trips bằng fetch(...)
  renderOrders(demoOrders);
  initMap();
  renderTrips(demoTrips);
  initDrawerEvents();
});
