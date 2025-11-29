// ===== Demo data cho kho tập kết (có thể được thay bằng API sau này) =====
let warehouses = [
  {
    id: "WH_0001",
    name: "Kho Thủ Đức",
    address: "",
    district: "TP. Thủ Đức",
    area: "Area 71308",
    lat: 10.86439,
    lng: 106.76207,
    status: "Active",
  },
  {
    id: "WH_0002",
    name: "Kho Quận 4",
    address: "",
    district: "Quận 4",
    area: "Area 700000",
    lat: 10.755,
    lng: 106.708,
    status: "Active",
  },
  {
    id: "WH_0003",
    name: "Kho Bình Tân",
    address: "",
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

  map = L.map("warehouseMap").setView([10.78, 106.7], 11);

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

    const nameLine = w.name ? `${w.name}<br>` : "";
    const addressLine = w.address ? `${w.address}<br>` : "";

    marker.bindPopup(
      `<b>#${w.id}</b><br>${nameLine}${addressLine}${w.district}<br>${w.area}<br>Status: ${w.status}`
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
      const text = (w.id + " " + w.district + " " + w.area).toLowerCase();
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
          <span class="wh-card-id">#${w.id}</span>
          <span class="wh-status-pill ${
            w.status === "Active" ? "wh-status-active" : "wh-status-inactive"
          }">${w.status}</span>
        </div>
        <div class="wh-card-sub">
          ${w.district || "—"} • ${w.area || ""}
        </div>
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

// ===== Drawer: mở / đóng & thêm kho mới =====
function resetWarehouseForm() {
  const form = document.getElementById("whForm");
  if (!form) return;
  form.reset();
  // trạng thái mặc định
  const statusSelect = document.getElementById("whStatusInput");
  if (statusSelect) statusSelect.value = "Active";
}

function openWarehouseDrawer() {
  const backdrop = document.getElementById("warehouseDrawer");
  if (!backdrop) return;
  resetWarehouseForm();
  backdrop.classList.add("active");
}

function closeWarehouseDrawer() {
  const backdrop = document.getElementById("warehouseDrawer");
  if (!backdrop) return;
  backdrop.classList.remove("active");
}

function handleWarehouseSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const id = (formData.get("id") || "").trim();
  const name = (formData.get("name") || "").trim();
  const district = (formData.get("district") || "").trim();
  const area = (formData.get("area") || "").trim();
  const address = (formData.get("address") || "").trim();
  const latVal = parseFloat(formData.get("lat"));
  const lngVal = parseFloat(formData.get("lng"));
  const status = (formData.get("status") || "Active").trim() || "Active";

  if (!id) {
    alert("Vui lòng nhập Mã kho (Warehouse_ID).");
    return;
  }
  if (isNaN(latVal) || isNaN(lngVal)) {
    alert("Vui lòng nhập toạ độ Latitude / Longitude hợp lệ.");
    return;
  }

  // Kiểm tra trùng id (đơn giản)
  const existed = warehouses.find(
    (w) => w.id.toLowerCase() === id.toLowerCase()
  );
  if (existed) {
    if (
      !confirm(
        "Đã tồn tại kho với ID này. Bạn có chắc muốn thêm tiếp (có thể trùng)?"
      )
    ) {
      return;
    }
  }

  const newWarehouse = {
    id,
    name,
    address,
    district,
    area,
    lat: latVal,
    lng: lngVal,
    status,
  };

  warehouses.push(newWarehouse);
  updateChipCounts();
  renderWarehouseList();
  closeWarehouseDrawer();
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

  // Drawer events
  const btnAddWarehouse = document.getElementById("btnAddWarehouse");
  const drawerBackdrop = document.getElementById("warehouseDrawer");
  const btnClose = document.getElementById("whDrawerClose");
  const btnCancel = document.getElementById("whDrawerCancel");
  const form = document.getElementById("whForm");

  if (btnAddWarehouse) {
    btnAddWarehouse.addEventListener("click", openWarehouseDrawer);
  }
  if (btnClose) btnClose.addEventListener("click", closeWarehouseDrawer);
  if (btnCancel) btnCancel.addEventListener("click", closeWarehouseDrawer);

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", (e) => {
      if (e.target === drawerBackdrop) {
        closeWarehouseDrawer();
      }
    });
  }

  if (form) {
    form.addEventListener("submit", handleWarehouseSubmit);
  }

  // render lần đầu
  renderWarehouseList();
});
