// Demo data tình nguyện viên – bạn có thể thay bằng data thật sau này
const demoVolunteers = [
  {
    id: "VL_9100888888",
    name: "Trần Mai Hương",
    phone: "0908 888 888",
    vehicle: "Xe máy",
    plate: "59X3-12345",
    maxLoadKg: 60,
    area: "Area 700000 – Quận 4",
    currentTrip: "RT_0001",
    status: "Available",
    lastActive: "2025-03-01 08:40",
  },
  {
    id: "VL_9100505678",
    name: "Nguyễn Văn An",
    phone: "0905 056 578",
    vehicle: "Xe máy",
    plate: "59Y1-56789",
    maxLoadKg: 60,
    area: "Area 71308 – Thủ Đức",
    currentTrip: "RT_0002",
    status: "Busy",
    lastActive: "2025-03-01 09:05",
  },
  {
    id: "VL_9100508888",
    name: "Nguyễn Văn B",
    phone: "0905 088 888",
    vehicle: "Xe máy",
    plate: "50H1-88888",
    maxLoadKg: 50,
    area: "Area 700000 – Quận 4",
    currentTrip: "",
    status: "Available",
    lastActive: "2025-03-01 07:55",
  },
  {
    id: "VL_9100123456",
    name: "Phạm Hoàng Nam",
    phone: "0912 345 678",
    vehicle: "Xe máy",
    plate: "59A1-23456",
    maxLoadKg: 60,
    area: "Area 71300 – Bình Thạnh",
    currentTrip: "",
    status: "Inactive",
    lastActive: "2025-02-28 19:30",
  },
];

// màu cho status (dùng inline style cho đỡ phải sửa CSS)
function getStatusStyle(status) {
  switch (status) {
    case "Available":
      return "background:#dcfce7;color:#15803d;";
    case "Busy":
      return "background:#fee2e2;color:#b91c1c;";
    case "Inactive":
      return "background:#e5e7eb;color:#4b5563;";
    default:
      return "background:#e5e7eb;color:#4b5563;";
  }
}

function renderVolunteers(list) {
  const tbody = document.getElementById("volTableBody");
  tbody.innerHTML = "";

  list.forEach((v) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <span class="order-id">${v.id}</span>
        <div class="household-sub">${v.name}</div>
      </td>
      <td>${v.phone}</td>
      <td>${v.vehicle}</td>
      <td>${v.plate}</td>
      <td>${v.maxLoadKg}</td>
      <td>${v.area}</td>
      <td>${v.currentTrip || "<span class='household-sub'>Không có</span>"}</td>
      <td>
        <span class="status-pill" style="${getStatusStyle(v.status)}">
          ${v.status}
        </span>
      </td>
      <td>${v.lastActive}</td>
      <td class="col-action">
        <button class="table-action-btn" data-vol="${v.id}">View</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelectorAll(".table-action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-vol");
      alert("Demo: Xem chi tiết tình nguyện viên " + id);
    });
  });
}

function populateVolunteerFilters() {
  const areaSelect = document.getElementById("volFilterArea");
  const vehicleSelect = document.getElementById("volFilterVehicle");

  const areas = Array.from(new Set(demoVolunteers.map((v) => v.area))).sort();
  const vehicles = Array.from(new Set(demoVolunteers.map((v) => v.vehicle)));

  areas.forEach((a) => {
    const opt = document.createElement("option");
    opt.value = a;
    opt.textContent = a;
    areaSelect.appendChild(opt);
  });

  vehicles.forEach((veh) => {
    if (!veh) return;
    const opt = document.createElement("option");
    opt.value = veh;
    opt.textContent = veh;
    vehicleSelect.appendChild(opt);
  });
}

function updateVolunteerCounts() {
  const total = demoVolunteers.length;
  const available = demoVolunteers.filter((v) => v.status === "Available").length;
  const busy = demoVolunteers.filter((v) => v.status === "Busy").length;
  const inactive = demoVolunteers.filter((v) => v.status === "Inactive").length;

  document.getElementById("volCountAll").textContent = total;
  document.getElementById("volCountAvailable").textContent = available;
  document.getElementById("volCountBusy").textContent = busy;
  document.getElementById("volCountInactive").textContent = inactive;
}

function applyVolunteerFilters() {
  const searchText = document
    .getElementById("volSearch")
    .value.toLowerCase()
    .trim();
  const statusSelect = document.getElementById("volFilterStatus").value;
  const areaSelect = document.getElementById("volFilterArea").value;
  const vehicleSelect = document.getElementById("volFilterVehicle").value;

  const activeChip = document.querySelector(".status-chip-active");
  const chipStatus = activeChip ? activeChip.dataset.status : "";

  const statusFilter = chipStatus || statusSelect || "";

  const filtered = demoVolunteers.filter((v) => {
    const matchSearch =
      !searchText ||
      v.id.toLowerCase().includes(searchText) ||
      v.name.toLowerCase().includes(searchText) ||
      v.phone.toLowerCase().includes(searchText);

    const matchStatus = !statusFilter || v.status === statusFilter;
    const matchArea = !areaSelect || v.area === areaSelect;
    const matchVehicle = !vehicleSelect || v.vehicle === vehicleSelect;

    return matchSearch && matchStatus && matchArea && matchVehicle;
  });

  renderVolunteers(filtered);
}

function clearVolunteerFilters() {
  document.getElementById("volSearch").value = "";
  document.getElementById("volFilterStatus").value = "";
  document.getElementById("volFilterArea").value = "";
  document.getElementById("volFilterVehicle").value = "";

  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.classList.remove("status-chip-active");
  });
  document
    .querySelector('.status-chip[data-status=""]')
    .classList.add("status-chip-active");

  renderVolunteers(demoVolunteers);
}

// Khởi động
document.addEventListener("DOMContentLoaded", () => {
  populateVolunteerFilters();
  updateVolunteerCounts();
  renderVolunteers(demoVolunteers);

  document.getElementById("volSearch").addEventListener("input", applyVolunteerFilters);
  document
    .getElementById("volFilterStatus")
    .addEventListener("change", applyVolunteerFilters);
  document
    .getElementById("volFilterArea")
    .addEventListener("change", applyVolunteerFilters);
  document
    .getElementById("volFilterVehicle")
    .addEventListener("change", applyVolunteerFilters);

  document
    .getElementById("volBtnApply")
    .addEventListener("click", applyVolunteerFilters);
  document
    .getElementById("volBtnClear")
    .addEventListener("click", clearVolunteerFilters);

  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".status-chip").forEach((c) =>
        c.classList.remove("status-chip-active")
      );
      chip.classList.add("status-chip-active");
      applyVolunteerFilters();
    });
  });
});
