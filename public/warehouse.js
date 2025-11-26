// ===== Demo data cho kho tập kết =====
const warehouses = [
  {
    id: "WH_0001",
    district: "TP. Thủ Đức",
    area: "Area 71308",
    lat: 10.86439,
    lng: 106.76207,
    status: "Active",
  },
  {
    id: "WH_0002",
    district: "Quận 4",
    area: "Area 700000",
    lat: 10.755,
    lng: 106.708,
    status: "Active",
  },
  {
    id: "WH_0003",
    district: "Bình Tân",
    area: "Area 700500",
    lat: 10.7705,
    lng: 106.606,
    status: "Inactive",
  },
];

let map;
let markerLayer;
let mapReady = false;
let markersById = {};
let currentStatusFilter = "";
let currentSearch = "";

// ===== Khởi tạo map OSM =====
function initMap() {
  if (mapReady) return;

  map = L.map("warehouseMap").setView([10.78, 106.70], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  mapReady = true;
}

function renderMarkers(data) {
  if (!mapReady) return;
  markerLayer.clearLayers();
  markersById = {};

  if (!data.length) return;

  const bounds = [];

  data.forEach((w) => {
    const marker = L.marker([w.lat, w.lng]).addTo(markerLayer);
    marker.bindPopup(
      `<b>${w.id}</b><br>${w.district}<br>${w.area}<br>Status: ${w.status}`
    );
    markersById[w.id] = marker;
    bounds.push([w.lat, w.lng]);
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }
}

function focusOnWarehouse(w) {
  if (!mapReady) return;
  map.setView([w.lat, w.lng], 13, { animate: true });
  const marker = markersById[w.id];
  if (marker) marker.openPopup();
}

// ===== Render list kho theo filter + search =====
function renderWarehouseList() {
  const listEl = document.getElementById("whList");
  listEl.innerHTML = "";

  const filtered = warehouses.filter((w) => {
    if (currentStatusFilter && w.status !== currentStatusFilter) return false;

    if (currentSearch) {
      const text =
        (w.id + " " + w.district + " " + w.area).toLowerCase();
      if (!text.includes(currentSearch)) return false;
    }
    return true;
  });

  if (!filtered.length) {
    listEl.innerHTML =
      '<div class="wh-empty">Không có kho nào phù hợp với bộ lọc hiện tại.</div>';
    renderMarkers([]);
    return;
  }

  filtered.forEach((w, index) => {
    const card = document.createElement("div");
    card.className = "wh-card" + (index === 0 ? " wh-card-active" : "");

    card.innerHTML = `
      <div class="wh-card-icon">WH</div>
      <div class="wh-card-info">
        <div class="wh-card-row-top">
          <span class="wh-card-id">${w.id}</span>
          <span class="wh-status-pill ${
            w.status === "Active" ? "wh-status-active" : "wh-status-inactive"
          }">${w.status}</span>
        </div>
        <div class="wh-card-sub">${w.district} • ${w.area}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".wh-card")
        .forEach((c) => c.classList.remove("wh-card-active"));
      card.classList.add("wh-card-active");
      focusOnWarehouse(w);
    });

    listEl.appendChild(card);

    // card đầu tiên sẽ auto focus
    if (index === 0) {
      focusOnWarehouse(w);
    }
  });

  renderMarkers(filtered);
}

function updateChipCounts() {
  document.getElementById("chipAllCount").textContent = warehouses.length;
  document.getElementById("chipActiveCount").textContent = warehouses.filter(
    (w) => w.status === "Active"
  ).length;
  document.getElementById("chipInactiveCount").textContent = warehouses.filter(
    (w) => w.status === "Inactive"
  ).length;
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  updateChipCounts();

  const searchInput = document.getElementById("whSearch");
  const chips = document.querySelectorAll(".wh-chip");

  // search
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    renderWarehouseList();
  });

  // chips filter
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("wh-chip-active"));
      chip.classList.add("wh-chip-active");
      currentStatusFilter = chip.dataset.status || "";
      renderWarehouseList();
    });
  });

  // render lần đầu
  renderWarehouseList();
});
