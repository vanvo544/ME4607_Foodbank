// js/app.js
document.addEventListener("DOMContentLoaded", function () {
  const API_BASE = "http://localhost:3000/api";

  // Demo users
  const DEMO_USERS = [
    {
      username: "0909000001",
      password: "1234",
      role: "admin",
      name: "Admin Foodbank",
    },
    {
      username: "0909000002",
      password: "1234",
      role: "volunteer",
      name: "Nguyễn Văn An",
      volunteerId: "VL_9100505678",
    },
    {
      username: "0909000003",
      password: "1234",
      role: "community",
      name: "Tổ trưởng P.8, Quận 4",
      warehouseIdScope: "WH_0002",
    },
    {
      username: "0909000004",
      password: "1234",
      role: "household",
      name: "Nguyễn Thị Hoa",
      householdId: "HH_9100401357",
    },
  ];

  let currentUser = null;

  /* ===================== Toast ===================== */
  function showToast(message) {
    const toast = document.getElementById("app-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("toast--visible");
    clearTimeout(showToast._timeoutId);
    showToast._timeoutId = setTimeout(() => {
      toast.classList.remove("toast--visible");
    }, 2200);
  }

  /* ===================== MAP (Leaflet) ===================== */
  let map = null;
  let mapMarkers = [];
  let mapPolyline = null;

  function initMap() {
    if (map) return;
    const mapElement = document.getElementById("fb-map");
    if (!mapElement || !window.L) return;

    const defaultCenter = [10.86439, 106.762077];
    map = L.map("fb-map").setView(defaultCenter, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
  }

  function drawRouteOnMap({ warehousePos, householdPos, checkpointPos }) {
    if (!map) return;

    mapMarkers.forEach((m) => m.remove());
    mapMarkers = [];
    if (mapPolyline) {
      mapPolyline.remove();
      mapPolyline = null;
    }

    const points = [];

    if (warehousePos) {
      const m1 = L.marker(warehousePos)
        .addTo(map)
        .bindPopup("Warehouse");
      mapMarkers.push(m1);
      points.push(warehousePos);
    }
    if (checkpointPos) {
      const m2 = L.marker(checkpointPos)
        .addTo(map)
        .bindPopup("Điểm tập kết");
      mapMarkers.push(m2);
      points.push(checkpointPos);
    }
    if (householdPos) {
      const m3 = L.marker(householdPos)
        .addTo(map)
        .bindPopup("Hộ gia đình");
      mapMarkers.push(m3);
      points.push(householdPos);
    }

    if (points.length >= 2) {
      mapPolyline = L.polyline(points, { weight: 4 }).addTo(map);
      map.fitBounds(mapPolyline.getBounds(), { padding: [20, 20] });
    } else if (points.length === 1) {
      map.setView(points[0], 14);
    }
  }

  function renderMapForOrder(order) {
    if (!map || !order) return;

    const warehousePos =
      order.warehouseLat && order.warehouseLng
        ? [order.warehouseLat, order.warehouseLng]
        : null;
    const householdPos =
      order.householdLat && order.householdLng
        ? [order.householdLat, order.householdLng]
        : null;
    const checkpointPos =
      warehousePos && householdPos
        ? [
            (warehousePos[0] + householdPos[0]) / 2,
            (warehousePos[1] + householdPos[1]) / 2,
          ]
        : null;

    drawRouteOnMap({ warehousePos, householdPos, checkpointPos });

    const titleEl = document.getElementById("map-tooltip-title");
    const bodyEl = document.getElementById("map-tooltip-body");
    if (titleEl)
      titleEl.textContent =
        order.status === "delivered"
          ? "Đơn đã giao thành công"
          : order.status === "upcoming"
          ? "Đơn chờ lấy hàng"
          : order.status === "failed"
          ? "Đơn thất bại"
          : "Đang xử lý đơn hàng";

    if (bodyEl) {
      const lines = [];
      lines.push(
        `Warehouse: ${order.warehouseId || ""} - ${
          order.warehouseName || ""
        }`
      );
      if (order.householdAddress)
        lines.push(`Địa chỉ giao: ${order.householdAddress}`);
      if (order.etaTime) lines.push(`ETA: ${order.etaTime}`);
      bodyEl.innerHTML = lines.join("<br>");
    }
  }

  function renderMapForTrip(trip) {
    if (!trip) return;
    const fakeOrder = {
      warehouseLat: trip.warehouseLat,
      warehouseLng: trip.warehouseLng,
      householdLat: trip.householdLat,
      householdLng: trip.householdLng,
      warehouseId: trip.warehouseId,
      warehouseName: trip.warehouseName,
      householdAddress: trip.householdAddress,
      etaTime: trip.etaTime,
      status: trip.status,
    };
    renderMapForOrder(fakeOrder);
  }

  /* ===================== Checkpoints & items ===================== */
  function renderCheckpoints(list) {
    const ul = document.getElementById("checkpoint-list");
    if (!ul) return;
    ul.innerHTML = "";
    (list || []).forEach((cp) => {
      const li = document.createElement("li");
      li.classList.add("checkpoint");
      const st = (cp.state || "").toLowerCase();
      if (st === "done") li.classList.add("checkpoint--done");
      if (st === "current") li.classList.add("checkpoint--current");
      li.innerHTML = `
        <span class="checkpoint__time">${cp.time || ""}</span>
        <span class="checkpoint__title">${cp.title || ""}</span>
        <span class="checkpoint__meta">${cp.meta || ""}</span>
      `;
      ul.appendChild(li);
    });
  }

  function renderOrderItems(list) {
    const body = document.getElementById("order-items-body");
    if (!body) return;
    body.innerHTML = "";
    (list || []).forEach((it) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${it.id || ""}</td>
        <td>${it.name || ""}</td>
        <td>${it.category || ""}</td>
        <td>${it.quantity || ""}</td>
        <td>${it.unit || ""}</td>
        <td>${it.weight || ""}</td>
      `;
      body.appendChild(tr);
    });
  }

  function updateRouteHeaderFromOrder(order) {
    const currentOrderEl = document.getElementById("route-current-order");
    const currentRouteEl = document.getElementById("route-current-id");
    if (currentOrderEl) currentOrderEl.textContent = `Order #${order.id}`;
    if (currentRouteEl) currentRouteEl.textContent = order.routeId || "-";

    const idEl = document.getElementById("route-info-id");
    const volEl = document.getElementById("route-info-volunteer-id");
    const campEl = document.getElementById("route-info-campaign-id");
    const whEl = document.getElementById("route-info-warehouse-id");
    const startEl = document.getElementById("route-info-start-time");
    const distEl = document.getElementById("route-info-distance");

    if (idEl) idEl.textContent = order.routeId || "-";
    if (volEl) volEl.textContent = order.volunteerId || "Chưa gán";
    if (campEl) campEl.textContent = order.campaignId || "-";
    if (whEl) whEl.textContent = order.warehouseId || "-";
    if (startEl)
      startEl.textContent = order.routeStartTime || order.createdTime || "-";
    if (distEl)
      distEl.textContent =
        order.routeDistanceKm != null ? `${order.routeDistanceKm} km` : "-";
  }

  function updateRouteHeaderFromTrip(trip) {
    const currentOrderEl = document.getElementById("route-current-order");
    const currentRouteEl = document.getElementById("route-current-id");
    if (currentOrderEl) currentOrderEl.textContent = `Trip ${trip.tripId}`;
    if (currentRouteEl) currentRouteEl.textContent = trip.tripId || "-";

    const idEl = document.getElementById("route-info-id");
    const volEl = document.getElementById("route-info-volunteer-id");
    const campEl = document.getElementById("route-info-campaign-id");
    const whEl = document.getElementById("route-info-warehouse-id");
    const startEl = document.getElementById("route-info-start-time");
    const distEl = document.getElementById("route-info-distance");

    if (idEl) idEl.textContent = trip.tripId || "-";
    if (volEl)
      volEl.textContent = trip.volunteerId
        ? `${trip.volunteerId} – ${trip.volunteerName || ""}`
        : "Chưa gán";
    if (campEl) campEl.textContent = trip.campaignId || "-";
    if (whEl) whEl.textContent = trip.warehouseId || "-";
    if (startEl)
      startEl.textContent = trip.routeStartTime || trip.firstCreatedTime || "-";
    if (distEl)
      distEl.textContent =
        trip.routeDistanceKm != null ? `${trip.routeDistanceKm} km` : "-";
  }

  async function loadOrderDetailsFromApi(orderId) {
    try {
      const [cpsRes, itemsRes] = await Promise.all([
        fetch(`${API_BASE}/orders/${orderId}/checkpoints`),
        fetch(`${API_BASE}/orders/${orderId}/items`),
      ]);
      const cpsRows = await cpsRes.json();
      const itemsRows = await itemsRes.json();

      const cps = cpsRows.map((cp) => ({
        time: cp.time,
        title: cp.title,
        meta: cp.meta,
        state: cp.state,
      }));
      const items = itemsRows.map((it) => ({
        id: it.order_item_id,
        name: it.product_name,
        category: it.category,
        quantity: it.quantity,
        unit: it.unit,
        weight: it.weight_kg,
      }));

      renderCheckpoints(cps);
      renderOrderItems(items);
    } catch (err) {
      console.error(err);
      showToast("Không tải được chi tiết route / items");
    }
  }

  /* ===================== Orders & Trips ===================== */
  let orders = [];
  let ordersById = {};
  let trips = [];
  let tripCards = [];
  let orderRows = [];

  const searchInput = document.querySelector(".search-box input");
  const statusTabs = document.querySelectorAll(".tabs .tab");
  const sortSelect = document.querySelector(".select--order-sort");
  const orderTableBody = document.getElementById("order-table-body");
  const tripList = document.getElementById("trip-list");

  function normalizeStatus(raw) {
    const s = (raw || "").toString().toLowerCase();
    if (s.includes("intransit")) return { code: "in-transit", label: "InTransit" };
    if (s.includes("delivered")) return { code: "delivered", label: "Delivered" };
    if (s.includes("failed")) return { code: "failed", label: "Failed" };
    return { code: "upcoming", label: "Upcoming" };
  }

  function mapDbOrderToUiOrder(row) {
    const { code, label } = normalizeStatus(row.status);
    return {
      id: row.order_id,
      status: code,
      statusLabel: label,
      campaignId: row.campaign_id,
      warehouseId: row.warehouse_id,
      warehouseName: row.warehouse_name,
      warehouseAddress: row.warehouse_address,
      warehouseLat: row.warehouse_latitude,
      warehouseLng: row.warehouse_longitude,
      householdId: row.household_id,
      householdName: row.household_name,
      householdAddress: row.household_address,
      householdLat: row.household_latitude,
      householdLng: row.household_longitude,
      volunteerId: row.volunteer_id,
      volunteerName: row.volunteer_name,
      volunteerPhone: row.volunteer_phone,
      vehicleType: row.volunteer_vehicle_type || "Xe máy",
      plateNumber: row.volunteer_plate_number,
      maxWeight: row.volunteer_max_weight_kg,
      packagesCount: row.packages_count,
      totalWeight: row.total_weight_kg,
      priority: row.priority,
      packageType: row.package_type,
      createdTime: row.created_time,
      pickupTime: row.pickup_time,
      etaTime: row.eta_time,
      completedTime: row.completed_time,
      routeId: row.route_id,
      routeStartTime: row.route_start_time,
      routeDistanceKm: row.route_total_distance_km,
    };
  }

  function badgeClassForStatus(orderStatus) {
    return orderStatus === "in-transit"
      ? "badge--intransit"
      : orderStatus === "delivered"
      ? "badge--delivered"
      : orderStatus === "failed"
      ? "badge--failed"
      : "badge--upcoming";
  }

  function createOrderRow(order) {
    const tr = document.createElement("tr");
    tr.dataset.orderId = order.id;
    tr.dataset.status = order.status || "upcoming";
    const badgeClass = badgeClassForStatus(order.status);

    const whText = `${order.warehouseId || ""}${
      order.warehouseName ? " – " + order.warehouseName : ""
    }`;
    const hhText = `${order.householdId || ""}${
      order.householdName ? " – " + order.householdName : ""
    }`;

    tr.innerHTML = `
      <td>#${order.id}</td>
      <td>
        <span class="badge ${badgeClass}">${order.statusLabel}</span>
      </td>
      <td>${order.campaignId || ""}</td>
      <td>
        <div>${whText}</div>
        <div style="font-size:11px;color:#6b7280;">→ ${hhText}</div>
      </td>
      <td>
        ${
          order.volunteerId
            ? `<div>${order.volunteerId} – ${order.volunteerName || ""}</div>
               <div style="font-size:11px;color:#6b7280;">${
                 order.vehicleType || "Xe máy"
               } ${
                order.plateNumber ? "• " + order.plateNumber : ""
               }</div>`
            : "<span style='font-size:11px;color:#9ca3af;'>Chưa gán</span>"
        }
      </td>
      <td>${order.createdTime || ""}</td>
      <td>${order.etaTime || ""}</td>
    `;
    return tr;
  }

  function attachOrderRowEvents(tr, order) {
    tr.addEventListener("click", () => {
      orderRows.forEach((r) => r.classList.remove("order-row--active"));
      tr.classList.add("order-row--active");
      tripCards.forEach((c) => c.classList.remove("trip-card--active"));

      renderMapForOrder(order);
      updateRouteHeaderFromOrder(order);
      loadOrderDetailsFromApi(order.id);
    });
  }

  function updateMetricsFromOrders() {
    const totalEl = document.getElementById("metric-total");
    const inEl = document.getElementById("metric-intransit");
    const delEl = document.getElementById("metric-delivered");
    const failEl = document.getElementById("metric-failed");
    if (!totalEl || !inEl || !delEl || !failEl) return;

    const total = orders.length;
    const inTransit = orders.filter((o) => o.status === "in-transit").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const failed = orders.filter((o) => o.status === "failed").length;

    totalEl.textContent = total;
    inEl.textContent = inTransit;
    delEl.textContent = delivered;
    failEl.textContent = failed;
  }

  function buildTripsFromOrders() {
    const map = new Map();

    orders.forEach((o) => {
      const key = o.routeId || `TRIP_${o.id}`;
      if (!map.has(key)) {
        map.set(key, {
          tripId: key,
          status: o.status,
          statusLabel: o.statusLabel,
          warehouseId: o.warehouseId,
          warehouseName: o.warehouseName,
          warehouseAddress: o.warehouseAddress,
          warehouseLat: o.warehouseLat,
          warehouseLng: o.warehouseLng,
          householdAddress: o.householdAddress,
          householdLat: o.householdLat,
          householdLng: o.householdLng,
          volunteerId: o.volunteerId,
          volunteerName: o.volunteerName,
          volunteerPhone: o.volunteerPhone,
          campaignId: o.campaignId,
          routeStartTime: o.routeStartTime,
          routeDistanceKm: o.routeDistanceKm,
          firstCreatedTime: o.createdTime,
          etaTime: o.etaTime,
          orders: [],
        });
      }
      map.get(key).orders.push(o);
    });

    trips = Array.from(map.values());
  }

  function createTripCard(trip) {
    const card = document.createElement("div");
    card.className = "trip-card";
    const badgeClass = badgeClassForStatus(trip.status);

    const whText = `${trip.warehouseId || ""}${
      trip.warehouseName ? " – " + trip.warehouseName : ""
    }`;

    card.innerHTML = `
      <div class="trip-card__top">
        <div class="trip-card__id">Trip ${trip.tripId}</div>
        <span class="badge ${badgeClass}">${trip.statusLabel}</span>
      </div>

      <div class="trip-card__middle">
        <div class="trip-card__line">
          <div class="trip-card__dot trip-card__dot--pickup"></div>
          <div>
            <div class="trip-card__label">Pickup (Warehouse)</div>
            <div class="trip-card__address">${whText}</div>
          </div>
        </div>
        <div class="trip-card__line">
          <div class="trip-card__dot trip-card__dot--drop"></div>
          <div>
            <div class="trip-card__label">Drop to Household</div>
            <div class="trip-card__address">${
              trip.householdAddress || "Nhiều hộ (route)"
            }</div>
          </div>
        </div>
      </div>

      <div class="trip-card__bottom">
        <div class="trip-card__volunteer">
          <div class="avatar avatar--small">
            ${
              trip.volunteerName
                ? trip.volunteerName.split(" ").slice(-1)[0].slice(0, 2)
                : "?"
            }
          </div>
          <div class="trip-card__volunteer-info">
            <span>${
              trip.volunteerId
                ? `${trip.volunteerId} – ${trip.volunteerName || ""}`
                : "Chưa gán tình nguyện viên"
            }</span>
            <span style="color:#6b7280;">${
              trip.volunteerPhone || ""
            }</span>
          </div>
        </div>
        <div style="font-size:11px;text-align:right;">
          <div>Bắt đầu: ${trip.routeStartTime || trip.firstCreatedTime || "-"}</div>
          <div>Quãng đường: ${
            trip.routeDistanceKm != null ? trip.routeDistanceKm + " km" : "-"
          }</div>
        </div>
      </div>
    `;
    return card;
  }

  function attachTripCardEvents(card, trip) {
    card.addEventListener("click", () => {
      tripCards.forEach((c) => c.classList.remove("trip-card--active"));
      card.classList.add("trip-card--active");
      orderRows.forEach((r) => r.classList.remove("order-row--active"));

      renderMapForTrip(trip);
      updateRouteHeaderFromTrip(trip);

      if (trip.orders && trip.orders.length > 0) {
        loadOrderDetailsFromApi(trip.orders[0].id);
      }
    });
  }

  function renderTripsList() {
    if (!tripList) return;
    tripList.innerHTML = "";
    tripCards = [];
    trips.forEach((trip) => {
      const card = createTripCard(trip);
      tripList.appendChild(card);
      tripCards.push(card);
      attachTripCardEvents(card, trip);
    });
  }

  function renderOrdersList() {
    if (!orderTableBody) return;
    orderTableBody.innerHTML = "";
    orderRows = [];

    orders.forEach((order) => {
      const tr = createOrderRow(order);
      orderTableBody.appendChild(tr);
      orderRows.push(tr);
      attachOrderRowEvents(tr, order);
    });
  }

  // Fetch orders
  async function fetchOrdersFromApi({
    status = "all",
    q = "",
    sort = "eta-asc",
  } = {}) {
    const params = new URLSearchParams();
    if (status && status !== "all") params.append("status", status);
    if (q) params.append("q", q);
    if (sort) params.append("sort", sort);

    const res = await fetch(`${API_BASE}/orders?` + params.toString());
    if (!res.ok) throw new Error("Cannot fetch orders");
    return await res.json();
  }

  async function reloadOrdersFromServer() {
    try {
      const q = (searchInput?.value || "").trim();
      const activeTab = document.querySelector(".tabs .tab.tab--active");
      const status = activeTab ? activeTab.dataset.status : "all";
      const sort = sortSelect?.value || "eta-asc";

      const rawOrders = await fetchOrdersFromApi({ status, q, sort });
      orders = rawOrders.map(mapDbOrderToUiOrder);
      ordersById = {};
      orders.forEach((o) => (ordersById[o.id] = o));

      // filter theo role
      if (currentUser) {
        if (currentUser.role === "volunteer" && currentUser.volunteerId) {
          orders = orders.filter((o) => o.volunteerId === currentUser.volunteerId);
        } else if (currentUser.role === "household" && currentUser.householdId) {
          orders = orders.filter((o) => o.householdId === currentUser.householdId);
        } else if (
          currentUser.role === "community" &&
          currentUser.warehouseIdScope
        ) {
          orders = orders.filter(
            (o) => o.warehouseId === currentUser.warehouseIdScope
          );
        }
      }

      updateMetricsFromOrders();
      renderOrdersList();
      buildTripsFromOrders();
      renderTripsList();

      if (orders.length > 0 && orderRows[0]) {
        orderRows[0].click();
      } else {
        renderCheckpoints([]);
        renderOrderItems([]);
      }
    } catch (err) {
      console.error(err);
      showToast("Không lấy được danh sách đơn hàng từ server");
    }
  }

  // search/tabs/sort events
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      reloadOrdersFromServer();
    });
  }
  statusTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      statusTabs.forEach((t) => t.classList.remove("tab--active"));
      tab.classList.add("tab--active");
      reloadOrdersFromServer();
    });
  });
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      reloadOrdersFromServer();
    });
  }

  // map view chips
  document
    .querySelectorAll(".map-panel__view-toggle .chip")
    .forEach((chip) => {
      chip.addEventListener("click", () => {
        document
          .querySelectorAll(".map-panel__view-toggle .chip")
          .forEach((c) => c.classList.remove("chip--active"));
        chip.classList.add("chip--active");
        showToast(`Chế độ xem: ${chip.textContent.trim()} (demo UI)`);
      });
    });

  /* ===================== Import Excel ===================== */
  const excelInput = document.getElementById("excel-input");
  if (excelInput && window.XLSX) {
    excelInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const wb = XLSX.read(data, { type: "array" });
          const sheet = wb.Sheets["Orders"] || wb.Sheets[wb.SheetNames[0]];
          if (!sheet) {
            showToast("Không tìm thấy sheet Orders trong Excel");
            return;
          }
          const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

          for (const row of rows) {
            const payload = {
              order_id: String(row.Order_ID || "").trim(),
              status: row.Status || "Upcoming",
              campaign_id: row.Campaign_ID || null,
              warehouse_id: row.Warehouse_ID || null,
              household_id: row.Household_ID || null,
              volunteer_id: row.Volunteer_ID || null,
              route_id: row.Route_ID || null,
              package_type: row.Package_Type || null,
              packages_count: row.Packages_Count || null,
              total_weight_kg: row.Total_Weight || null,
              priority: row.Priority || null,
              created_time: row.Created_time || null,
              pickup_time: row.Pickup_time || null,
              eta_time: row.ETA_time || null,
              completed_time: row.Completed_time || null,
              notes: row.Notes || null,
            };
            if (!payload.order_id) continue;

            await fetch(`${API_BASE}/orders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }).catch((err) => console.error(err));
          }

          showToast(`Đã import ${rows.length} dòng vào DB`);
          reloadOrdersFromServer();
        } catch (err) {
          console.error(err);
          showToast("Lỗi khi đọc file Excel");
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  /* ===================== Drawers ===================== */
  const drawerOverlay = document.getElementById("drawer-overlay");
  const drawerOrder = document.getElementById("drawer-order");
  const drawerCampaign = document.getElementById("drawer-campaign");
  const btnOpenOrder = document.getElementById("btn-open-create-order");
  const btnOpenCampaign = document.getElementById("btn-open-create-campaign");
  const btnOrderClose = document.getElementById("drawer-order-close");
  const btnCampaignClose = document.getElementById("drawer-campaign-close");
  const btnOrderCancel = document.getElementById("btn-cancel-create-order");
  const btnCampaignCancel = document.getElementById(
    "btn-cancel-create-campaign"
  );
  const orderForm = document.getElementById("create-order-form");
  const campaignForm = document.getElementById("create-campaign-form");

  function openDrawer(which) {
    if (drawerOverlay) drawerOverlay.classList.add("drawer-overlay--visible");
    if (which === "order" && drawerOrder)
      drawerOrder.classList.add("drawer--open");
    if (which === "campaign" && drawerCampaign)
      drawerCampaign.classList.add("drawer--open");
  }
  function closeDrawers() {
    if (drawerOverlay) drawerOverlay.classList.remove("drawer-overlay--visible");
    if (drawerOrder) drawerOrder.classList.remove("drawer--open");
    if (drawerCampaign) drawerCampaign.classList.remove("drawer--open");
  }
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawers);
  if (btnOrderClose) btnOrderClose.addEventListener("click", closeDrawers);
  if (btnCampaignClose) btnCampaignClose.addEventListener("click", closeDrawers);
  if (btnOrderCancel) btnOrderCancel.addEventListener("click", closeDrawers);
  if (btnCampaignCancel)
    btnCampaignCancel.addEventListener("click", closeDrawers);
  if (btnOpenOrder) {
    btnOpenOrder.addEventListener("click", () => openDrawer("order"));
  }
  if (btnOpenCampaign) {
    btnOpenCampaign.addEventListener("click", () => openDrawer("campaign"));
  }

  // submit tạo đơn
  if (orderForm) {
    orderForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(orderForm);

      const orderId = (formData.get("order_id") || "").toString().trim();
      if (!orderId) {
        showToast("Vui lòng nhập Order ID");
        return;
      }

      const createdRaw = formData.get("created_time");
      const etaRaw = formData.get("eta_time");
      const createdTime = createdRaw
        ? createdRaw.replace("T", " ")
        : new Date().toISOString().slice(0, 16).replace("T", " ");
      const etaTime = etaRaw ? etaRaw.replace("T", " ") : null;

      const payload = {
        order_id: orderId,
        status: formData.get("status") || "Upcoming",
        campaign_id: formData.get("campaign_id") || null,
        warehouse_id: formData.get("warehouse_id") || null,
        household_id: formData.get("household_id") || null,
        volunteer_id: formData.get("volunteer_id") || null,
        route_id: formData.get("route_id") || null,
        package_type: null,
        packages_count: formData.get("packages_count") || null,
        total_weight_kg: formData.get("total_weight_kg") || null,
        priority: formData.get("priority") || null,
        created_time: createdTime,
        pickup_time: null,
        eta_time: etaTime,
        completed_time: null,
        notes: formData.get("notes") || null,
      };

      try {
        const res = await fetch(`${API_BASE}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error(await res.text());
          showToast("Tạo đơn thất bại (API lỗi)");
          return;
        }

        showToast("Đã tạo đơn mới");
        orderForm.reset();
        closeDrawers();
        reloadOrdersFromServer();
      } catch (err) {
        console.error(err);
        showToast("Lỗi kết nối server khi tạo đơn");
      }
    });
  }

  /* ===================== Campaign list ===================== */
  const campaignTableBody = document.getElementById("campaign-table-body");

  async function loadCampaignsFromServer() {
    if (!campaignTableBody) return;
    try {
      const res = await fetch(`${API_BASE}/campaigns`);
      if (!res.ok) throw new Error("campaign_fetch_failed");
      const rows = await res.json();

      campaignTableBody.innerHTML = "";
      rows.forEach((c) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${c.campaign_id}</td>
          <td>${c.name || ""}</td>
          <td>${c.area || ""}</td>
          <td>${c.status || ""}</td>
          <td>${c.start_date || ""}</td>
          <td>${c.end_date || ""}</td>
        `;
        campaignTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
      showToast("Không tải được danh sách campaign");
    }
  }

  // submit tạo campaign
  if (campaignForm) {
    campaignForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(campaignForm);
      const id = (fd.get("campaign_id") || "").toString().trim();
      if (!id) {
        showToast("Vui lòng nhập Campaign ID");
        return;
      }

      const payload = {
        campaign_id: id,
        name: fd.get("name") || null,
        area: fd.get("area") || null,
        status: fd.get("status") || "Active",
        start_date: fd.get("start_date") || null,
        end_date: fd.get("end_date") || null,
        description: fd.get("description") || null,
      };

      try {
        const res = await fetch(`${API_BASE}/campaigns`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error(await res.text());
          showToast("Tạo campaign thất bại (API lỗi)");
          return;
        }

        showToast("Đã tạo campaign mới");
        campaignForm.reset();
        closeDrawers();
        loadCampaignsFromServer(); // cập nhật sidebar campaign
      } catch (err) {
        console.error(err);
        showToast("Lỗi kết nối server khi tạo campaign");
      }
    });
  }

  /* ===================== AUTH & ROLE ===================== */
  const authScreen = document.getElementById("auth-screen");
  const mainApp = document.getElementById("main-app");
  const roleCards = document.querySelectorAll("[data-role-card]");
  const authTabs = document.querySelectorAll(".auth-tab");
  const loginForm = document.getElementById("auth-login-form");
  const registerForm = document.getElementById("auth-register-form");
  const loginHint = document.getElementById("auth-login-hint");
  const logoutBtn = document.getElementById("btn-logout");

  let selectedRole = "admin";

  function updateAuthRoleUI() {
    if (loginHint) {
      let demoTxt = "";
      if (selectedRole === "admin") demoTxt = "0909000001 / 1234";
      else if (selectedRole === "volunteer") demoTxt = "0909000002 / 1234";
      else if (selectedRole === "community") demoTxt = "0909000003 / 1234";
      else if (selectedRole === "household") demoTxt = "0909000004 / 1234";
      loginHint.innerHTML = `Đang đăng nhập với vai trò <strong>${selectedRole}</strong>. Demo: <code>${demoTxt}</code>`;
    }

    document.querySelectorAll("[data-role-section]").forEach((el) => {
      const rs = (el.dataset.roleSection || "")
        .split(",")
        .map((r) => r.trim());
      el.style.display = rs.includes(selectedRole) ? "flex" : "none";
    });
  }

  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedRole = card.dataset.role || "admin";
      roleCards.forEach((c) => c.classList.remove("role-pill--active"));
      card.classList.add("role-pill--active");
      updateAuthRoleUI();
    });
  });

  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      authTabs.forEach((t) => t.classList.remove("auth-tab--active"));
      tab.classList.add("auth-tab--active");
      const mode = tab.dataset.authTab;
      if (mode === "login") {
        loginForm.classList.remove("auth-form--hidden");
        registerForm.classList.add("auth-form--hidden");
      } else {
        loginForm.classList.add("auth-form--hidden");
        registerForm.classList.remove("auth-form--hidden");
      }
    });
  });

  function applyRoleToUI(user) {
    const titleEl = document.getElementById("topbar-title");
    const subEl = document.getElementById("topbar-subtitle");
    const nameEl = document.getElementById("topbar-user-name");
    const roleEl = document.getElementById("topbar-user-role");
    const avatarEl = document.getElementById("topbar-avatar");

    if (nameEl) nameEl.textContent = user.name || user.username;
    if (avatarEl) {
      const n = (user.name || user.username || "?")
        .split(" ")
        .slice(-1)[0]
        .slice(0, 2)
        .toUpperCase();
      avatarEl.textContent = n;
    }

    if (user.role === "admin") {
      if (titleEl) titleEl.textContent = "Admin – Foodbank Logistics Hub";
      if (subEl)
        subEl.textContent =
          "Quan sát toàn bộ luồng đơn, tuyến đường và chiến dịch cứu trợ.";
      if (roleEl) roleEl.textContent = "Admin • Điều phối trung tâm";
    } else if (user.role === "community") {
      if (titleEl) titleEl.textContent = "Community Leader Dashboard";
      if (subEl)
        subEl.textContent =
          "Theo dõi nhu cầu hộ gia đình trong khu vực và yêu cầu giao hàng.";
      if (roleEl) roleEl.textContent = "Community Leader • Tổ trưởng";
    } else if (user.role === "volunteer") {
      if (titleEl) titleEl.textContent = "Volunteer Delivery Dashboard";
      if (subEl)
        subEl.textContent =
          "Xem tuyến đường, đơn được phân công và trạng thái giao hàng.";
      if (roleEl) roleEl.textContent = "Volunteer • Tình nguyện viên";
    } else if (user.role === "household") {
      if (titleEl) titleEl.textContent = "Vulnerable Household Portal";
      if (subEl)
        subEl.textContent =
          "Theo dõi trạng thái giao hàng hỗ trợ từ Foodbank theo thời gian.";
      if (roleEl) roleEl.textContent = "Beneficiary • Hộ gia đình yếu thế";
    }

    document.querySelectorAll("[data-visible-roles]").forEach((el) => {
      const roles = el.dataset.visibleRoles
        .split(",")
        .map((r) => r.trim().toLowerCase());
      el.style.display = roles.includes(user.role) ? "" : "none";
    });

    const totalLabel = document.getElementById("metric-total-label");
    if (totalLabel) {
      if (user.role === "volunteer" || user.role === "household")
        totalLabel.textContent = "Tổng đơn của tôi";
      else totalLabel.textContent = "Tổng đơn hôm nay";
    }
  }

  function enterAppWithRole(user) {
    currentUser = user;
    if (authScreen) authScreen.style.display = "none";
    if (mainApp) mainApp.classList.remove("app-shell--hidden");
    localStorage.setItem("fb_user", JSON.stringify(user));
    applyRoleToUI(user);
    initMap();
    reloadOrdersFromServer();
    loadCampaignsFromServer();
  }

  function logout() {
    currentUser = null;
    localStorage.removeItem("fb_user");
    if (mainApp) mainApp.classList.add("app-shell--hidden");
    if (authScreen) authScreen.style.display = "flex";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logout();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const username = (fd.get("username") || "").toString().trim();
      const password = (fd.get("password") || "").toString();

      const user = DEMO_USERS.find((u) => u.username === username);
      if (!user || user.password !== password) {
        showToast("Sai số điện thoại hoặc mật khẩu (demo)");
        return;
      }
      if (user.role !== selectedRole) {
        showToast("Tài khoản này thuộc vai trò khác. Hãy chọn đúng role.");
        return;
      }
      enterAppWithRole({ ...user });
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(registerForm);
      const fullName = (fd.get("fullName") || "").toString().trim();
      const username = (fd.get("username") || "").toString().trim();
      const password = (fd.get("password") || "").toString();

      if (!fullName || !username || !password) {
        showToast("Vui lòng nhập đầy đủ Họ tên, SĐT, Mật khẩu");
        return;
      }
      if (DEMO_USERS.some((u) => u.username === username)) {
        showToast("SĐT đã tồn tại trong demo, hãy chọn số khác");
        return;
      }

      const newUser = {
        username,
        password,
        role: selectedRole,
        name: fullName,
      };

      if (selectedRole === "volunteer") {
        newUser.volunteerId = (fd.get("volunteerId") || "").toString().trim();
      } else if (selectedRole === "household") {
        newUser.householdId = (fd.get("householdId") || "").toString().trim();
      } else if (selectedRole === "community") {
        newUser.warehouseIdScope = (fd.get("areaId") || "").toString().trim();
      }

      DEMO_USERS.push(newUser);
      showToast("Đăng ký thành công (demo) – tự động đăng nhập");
      enterAppWithRole({ ...newUser });
    });
  }

  const storedUserStr = localStorage.getItem("fb_user");
  if (storedUserStr) {
    try {
      const u = JSON.parse(storedUserStr);
      if (u && u.role) {
        enterAppWithRole(u);
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    if (authScreen) authScreen.style.display = "flex";
    if (mainApp) mainApp.classList.add("app-shell--hidden");
  }

  updateAuthRoleUI();

  // ===== Sidebar navigation =====
  const navItems = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".view");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = item.dataset.viewTarget;

      navItems.forEach((n) => n.classList.remove("nav-item--active"));
      item.classList.add("nav-item--active");

      views.forEach((v) => v.classList.remove("view--active"));
      const viewEl = document.getElementById(target);
      if (viewEl) viewEl.classList.add("view--active");

      if (target === "view-orders") {
        reloadOrdersFromServer();
      } else if (target === "view-campaigns") {
        loadCampaignsFromServer();
      }
    });
  });
});
