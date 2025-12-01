// ================== 1. DATA AREA ==================

const areas = [
  // ===== QUẬN 1 =====
  { areaId: "71006", name: "Phường Bến Nghé", district: "Quận 1",
    ubndAddress: "UBND phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71009", name: "Phường Bến Thành", district: "Quận 1",
    ubndAddress: "UBND phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71015", name: "Phường Cầu Kho", district: "Quận 1",
    ubndAddress: "UBND phường Cầu Kho, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71011", name: "Phường Cầu Ông Lãnh", district: "Quận 1",
    ubndAddress: "UBND phường Cầu Ông Lãnh, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71013", name: "Phường Cô Giang", district: "Quận 1",
    ubndAddress: "UBND phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71007", name: "Phường Đa Kao", district: "Quận 1",
    ubndAddress: "UBND phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71014", name: "Phường Nguyễn Cư Trinh", district: "Quận 1",
    ubndAddress: "UBND phường Nguyễn Cư Trinh, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71010", name: "Phường Nguyễn Thái Bình", district: "Quận 1",
    ubndAddress: "UBND phường Nguyễn Thái Bình, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71012", name: "Phường Phạm Ngũ Lão", district: "Quận 1",
    ubndAddress: "UBND phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71008", name: "Phường Tân Định", district: "Quận 1",
    ubndAddress: "UBND phường Tân Định, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },

  // ===== TP THỦ ĐỨC =====
  { areaId: "71313", name: "Phường Bình Chiểu", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Bình Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71306", name: "Phường Bình Thọ", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Bình Thọ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71315", name: "Phường Hiệp Bình Chánh", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Hiệp Bình Chánh, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71314", name: "Phường Hiệp Bình Phước", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Hiệp Bình Phước, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71307", name: "Phường Linh Chiểu", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Linh Chiểu, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71316", name: "Phường Linh Đông", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Linh Đông, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71310", name: "Phường Linh Tây", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Linh Tây, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71308", name: "Phường Linh Trung", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Linh Trung, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71309", name: "Phường Linh Xuân", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Linh Xuân, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71312", name: "Phường Tam Bình", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Tam Bình, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71311", name: "Phường Tam Phú", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Tam Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71317", name: "Phường Trường Thọ", district: "Thành phố Thủ Đức",
    ubndAddress: "UBND phường Trường Thọ, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },

  // ===== QUẬN 7 =====
  { areaId: "72914", name: "Phường Bình Thuận", district: "Quận 7",
    ubndAddress: "UBND phường Bình Thuận, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72906", name: "Phường Phú Mỹ", district: "Quận 7",
    ubndAddress: "UBND phường Phú Mỹ, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72907", name: "Phường Phú Thuận", district: "Quận 7",
    ubndAddress: "UBND phường Phú Thuận, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72912", name: "Phường Tân Hưng", district: "Quận 7",
    ubndAddress: "UBND phường Tân Hưng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72911", name: "Phường Tân Kiểng", district: "Quận 7",
    ubndAddress: "UBND phường Tân Kiểng, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72915", name: "Phường Tân Phong", district: "Quận 7",
    ubndAddress: "UBND phường Tân Phong, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72908", name: "Phường Tân Phú", district: "Quận 7",
    ubndAddress: "UBND phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72913", name: "Phường Tân Quy", district: "Quận 7",
    ubndAddress: "UBND phường Tân Quy, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72909", name: "Phường Tân Thuận Đông", district: "Quận 7",
    ubndAddress: "UBND phường Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "72910", name: "Phường Tân Thuận Tây", district: "Quận 7",
    ubndAddress: "UBND phường Tân Thuận Tây, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },

  // ===== QUẬN BÌNH TÂN =====
  { areaId: "71906", name: "Phường An Lạc", district: "Quận Bình Tân",
    ubndAddress: "UBND phường An Lạc, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71907", name: "Phường An Lạc A", district: "Quận Bình Tân",
    ubndAddress: "UBND phường An Lạc A, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71913", name: "Phường Bình Hưng Hòa", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Bình Hưng Hòa, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71912", name: "Phường Bình Hưng Hòa A", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Bình Hưng Hòa A, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71914", name: "Phường Bình Hưng Hòa B", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Bình Hưng Hòa B, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71910", name: "Phường Bình Trị Đông", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Bình Trị Đông, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71911", name: "Phường Bình Trị Đông A", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Bình Trị Đông A, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71908", name: "Phường Bình Trị Đông B", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Bình Trị Đông B, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71915", name: "Phường Tân Tạo", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Tân Tạo, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },
  { areaId: "71909", name: "Phường Tân Tạo A", district: "Quận Bình Tân",
    ubndAddress: "UBND phường Tân Tạo A, Quận Bình Tân, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" },

  // ===== QUẬN 4 – PHƯỜNG 18 =====
  { areaId: "72819", name: "Phường 18", district: "Quận 4",
    ubndAddress: "UBND phường 18, Quận 4, Thành phố Hồ Chí Minh, Việt Nam",
    coordinate: "" }
];

// ================== 2. SORT + PAGINATION STATE ==================

const PAGE_SIZE = 10;
let currentPage = 1;
let filteredAreas = [];

// sort theo Area_ID tăng dần
function sortByAreaId(list) {
  return [...list].sort((a, b) => {
    if (a.areaId < b.areaId) return -1;
    if (a.areaId > b.areaId) return 1;
    return 0;
  });
}

// ================== 3. RENDER BẢNG ==================

function renderAreas(list) {
  const tbody = document.getElementById("areaTableBody");
  tbody.innerHTML = "";

  list.forEach((a) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="order-id">#${a.areaId}</span></td>
      <td>${a.name}</td>
      <td>${a.district}</td>
      <td>${a.ubndAddress}</td>
      <td>${a.coordinate || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ================== 4. RENDER PAGINATION ==================

function renderPagination() {
  const container = document.getElementById("areaPagination");
  container.innerHTML = "";

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAreas.length / PAGE_SIZE || 1)
  );
  if (currentPage > totalPages) currentPage = totalPages;

  // Previous
  const prevBtn = document.createElement("button");
  prevBtn.className = "page-btn";
  prevBtn.textContent = "Previous";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateTableAndPagination();
    }
  });
  container.appendChild(prevBtn);

  // Các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "page-number" + (i === currentPage ? " page-number-active" : "");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      updateTableAndPagination();
    });
    container.appendChild(btn);
  }

  // Next
  const nextBtn = document.createElement("button");
  nextBtn.className = "page-btn";
  nextBtn.textContent = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updateTableAndPagination();
    }
  });
  container.appendChild(nextBtn);
}

// ================== 5. KẾT HỢP: LỌC + PHÂN TRANG ==================

function updateTableAndPagination() {
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAreas.length / PAGE_SIZE || 1)
  );
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filteredAreas.slice(start, start + PAGE_SIZE);

  renderAreas(pageItems);
  renderPagination();
}

function renderDistrictChips() {
  const row = document.getElementById("districtChipsRow");
  row.innerHTML = "";

  const districts = Array.from(new Set(areas.map((a) => a.district))).sort();

  const allChip = document.createElement("button");
  allChip.className = "status-chip status-chip-active";
  allChip.dataset.district = "";
  allChip.innerHTML = `All areas <span class="chip-count" id="countAll">${areas.length}</span>`;
  row.appendChild(allChip);

  districts.forEach((d) => {
    const count = areas.filter((a) => a.district === d).length;
    const chip = document.createElement("button");
    chip.className = "status-chip";
    chip.dataset.district = d;
    chip.innerHTML = `${d} <span class="chip-count">${count}</span>`;
    row.appendChild(chip);
  });

  row.querySelectorAll(".status-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      row.querySelectorAll(".status-chip").forEach((c) =>
        c.classList.remove("status-chip-active")
      );
      chip.classList.add("status-chip-active");
      currentPage = 1;
      applyFilters();
    });
  });
}

function populateFilters() {
  const districtSelect = document.getElementById("filterDistrict");
  const zipPrefixSelect = document.getElementById("filterZipPrefix");

  const districts = Array.from(new Set(areas.map((a) => a.district))).sort();
  const zipPrefixes = Array.from(
    new Set(areas.map((a) => a.areaId.substring(0, 2)))
  ).sort();

  districts.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    districtSelect.appendChild(opt);
  });

  zipPrefixes.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = `${p}xxx`;
    zipPrefixSelect.appendChild(opt);
  });
}

function applyFilters() {
  const searchText = document
    .getElementById("areaSearch")
    .value.toLowerCase()
    .trim();

  const districtSelectVal = document.getElementById("filterDistrict").value;
  const zipPrefixVal = document.getElementById("filterZipPrefix").value;
  const hasCoordVal = document.getElementById("filterHasCoordinate").value;

  const activeChip = document.querySelector(
    "#districtChipsRow .status-chip-active"
  );
  const chipDistrict = activeChip ? activeChip.dataset.district : "";

  const districtFilter = chipDistrict || districtSelectVal || "";

  const filtered = areas.filter((a) => {
    const text = (
      "#" +
      a.areaId +
      " " +
      a.name +
      " " +
      a.district +
      " " +
      a.ubndAddress +
      " " +
      (a.coordinate || "")
    )
      .toLowerCase()
      .trim();

    const matchSearch = !searchText || text.includes(searchText);
    const matchDistrict = !districtFilter || a.district === districtFilter;
    const matchZipPrefix =
      !zipPrefixVal || a.areaId.startsWith(zipPrefixVal.toString());
    const hasCoord = !!a.coordinate && a.coordinate.trim() !== "";
    const matchCoord =
      !hasCoordVal ||
      (hasCoordVal === "has" && hasCoord) ||
      (hasCoordVal === "missing" && !hasCoord);

    return matchSearch && matchDistrict && matchZipPrefix && matchCoord;
  });

  // sort theo Area_ID rồi lưu vào filteredAreas để phân trang
  filteredAreas = sortByAreaId(filtered);
  updateTableAndPagination();
}

function clearFilters() {
  document.getElementById("areaSearch").value = "";
  document.getElementById("filterDistrict").value = "";
  document.getElementById("filterZipPrefix").value = "";
  document.getElementById("filterHasCoordinate").value = "";

  const row = document.getElementById("districtChipsRow");
  row.querySelectorAll(".status-chip").forEach((c) =>
    c.classList.remove("status-chip-active")
  );
  const allChip = row.querySelector('.status-chip[data-district=""]');
  if (allChip) allChip.classList.add("status-chip-active");

  currentPage = 1;
  applyFilters();
}

// ================== 6. INIT ==================

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Area] area.js loaded, total areas:", areas.length);

  renderDistrictChips();
  populateFilters();

  // khởi tạo: filteredAreas = toàn bộ areas đã sort theo Area_ID
  filteredAreas = sortByAreaId(areas);
  updateTableAndPagination();

  document.getElementById("areaSearch").addEventListener("input", () => {
    currentPage = 1;
    applyFilters();
  });
  document
    .getElementById("filterDistrict")
    .addEventListener("change", () => {
      currentPage = 1;
      applyFilters();
    });
  document
    .getElementById("filterZipPrefix")
    .addEventListener("change", () => {
      currentPage = 1;
      applyFilters();
    });
  document
    .getElementById("filterHasCoordinate")
    .addEventListener("change", () => {
      currentPage = 1;
      applyFilters();
    });

  document
    .getElementById("btnApplyFilter")
    .addEventListener("click", () => {
      currentPage = 1;
      applyFilters();
    });
  document
    .getElementById("btnClearFilter")
    .addEventListener("click", clearFilters);
});
// ================== END OF FILE ==================