// ===== Demo data Households (đủ field theo DEMO OUTLINE) =====
const demoHouseholds = [
  {
    id: "HH_9100402000",
    areaId: "71308",
    address: "12/3 Đường Hoàng Diệu, P.8, Q.4, TP.HCM",
    updateTime: "2025-03-01T09:30:00",
    headName: "Trần Văn Hùng",
    phone: "+849120000001",
    numberPeople: 4,
    numberChildren: 1,
    numberOlder: 1,
    vulnerabilityType: "Lao động thu nhập thấp",
    cardNumber: "079123456001",
    faceUrl: "",
    status: "Active",
  },
  {
    id: "HH_9100401357",
    areaId: "71308",
    address: "25 Đường Tôn Đản, P.9, Q.4, TP.HCM",
    updateTime: "2025-03-02T10:15:00",
    headName: "Mai Ánh Hồng",
    phone: "+849123334444",
    numberPeople: 3,
    numberChildren: 1,
    numberOlder: 0,
    vulnerabilityType: "Trẻ em",
    cardNumber: "079123456002",
    faceUrl: "",
    status: "Active",
  },
  {
    id: "HH_9100508888",
    areaId: "72010",
    address: "97 Kinh Dương Vương, Q.6, TP.HCM",
    updateTime: "2025-02-25T16:00:00",
    headName: "Nguyễn Văn B",
    phone: "+849125556666",
    numberPeople: 5,
    numberChildren: 2,
    numberOlder: 1,
    vulnerabilityType: "Người già",
    cardNumber: "079123456003",
    faceUrl: "",
    status: "Inactive",
  },
  {
    id: "HH_9100507777",
    areaId: "71308",
    address: "4/2 Nguyễn Tất Thành, Q.4, TP.HCM",
    updateTime: "2025-03-05T08:45:00",
    headName: "Lê Văn C",
    phone: "+849127778888",
    numberPeople: 2,
    numberChildren: 0,
    numberOlder: 1,
    vulnerabilityType: "Người già",
    cardNumber: "",
    faceUrl: "",
    status: "Active",
  },
];

// ===== Dummy lịch sử khảo sát / chỉnh sửa (UC-G03) =====
// Mỗi phần tử = 1 phiên bản dữ liệu household tại thời điểm khảo sát/chỉnh sửa
const householdEditHistory = [
  // HH_9100402000
  {
    hhId: "HH_9100402000",
    versionId: "HH_9100402000-2025-02-01",
    editedAt: "2025-02-01T09:00:00",
    editedBy: "Nguyễn Văn Tổ trưởng",
    editorRole: "Tổ dân phố",
    source: "Khảo sát tháng 02/2025",
    note: "Khảo sát định kỳ T02/2025.",
    snapshot: {
      id: "HH_9100402000",
      areaId: "71308",
      address: "12/3 Đường Hoàng Diệu, P.8, Q.4, TP.HCM",
      updateTime: "2025-02-01T09:00:00",
      headName: "Trần Văn Hùng",
      phone: "+849120000001",
      numberPeople: 4,
      numberChildren: 1,
      numberOlder: 1,
      vulnerabilityType: "Lao động thu nhập thấp",
      cardNumber: "079123456001",
      faceUrl: "",
      status: "Active",
    },
  },
  {
    hhId: "HH_9100402000",
    versionId: "HH_9100402000-2025-03-01",
    editedAt: "2025-03-01T09:30:00",
    editedBy: "Nguyễn Văn Tổ trưởng",
    editorRole: "Tổ dân phố",
    source: "Khảo sát tháng 03/2025",
    note: "Cập nhật thông tin mới sau khảo sát T03/2025.",
    snapshot: {
      id: "HH_9100402000",
      areaId: "71308",
      address: "12/3 Đường Hoàng Diệu, P.8, Q.4, TP.HCM",
      updateTime: "2025-03-01T09:30:00",
      headName: "Trần Văn Hùng",
      phone: "+849120000001",
      numberPeople: 4,
      numberChildren: 1,
      numberOlder: 1,
      vulnerabilityType: "Lao động thu nhập thấp",
      cardNumber: "079123456001",
      faceUrl: "",
      status: "Active",
    },
  },

  // HH_9100401357
  {
    hhId: "HH_9100401357",
    versionId: "HH_9100401357-2025-02-10",
    editedAt: "2025-02-10T08:30:00",
    editedBy: "Nguyễn Văn Tổ trưởng",
    editorRole: "Tổ dân phố",
    source: "Khảo sát tháng 02/2025",
    note: "Khảo sát lần đầu hộ yếu thế.",
    snapshot: {
      id: "HH_9100401357",
      areaId: "71308",
      address: "25 Đường Tôn Đản, P.9, Q.4, TP.HCM",
      updateTime: "2025-02-10T08:30:00",
      headName: "Mai Ánh Hồng",
      phone: "+849123334444",
      numberPeople: 3,
      numberChildren: 1,
      numberOlder: 0,
      vulnerabilityType: "Trẻ em",
      cardNumber: "079123456002",
      faceUrl: "",
      status: "Active",
    },
  },
  {
    hhId: "HH_9100401357",
    versionId: "HH_9100401357-2025-03-02",
    editedAt: "2025-03-02T10:15:00",
    editedBy: "Nguyễn Văn Tổ trưởng",
    editorRole: "Tổ dân phố",
    source: "Khảo sát tháng 03/2025",
    note: "Không thay đổi nhân khẩu, cập nhật lại nhu cầu hỗ trợ.",
    snapshot: {
      id: "HH_9100401357",
      areaId: "71308",
      address: "25 Đường Tôn Đản, P.9, Q.4, TP.HCM",
      updateTime: "2025-03-02T10:15:00",
      headName: "Mai Ánh Hồng",
      phone: "+849123334444",
      numberPeople: 3,
      numberChildren: 1,
      numberOlder: 0,
      vulnerabilityType: "Trẻ em",
      cardNumber: "079123456002",
      faceUrl: "",
      status: "Active",
    },
  },

  // HH_9100508888
  {
    hhId: "HH_9100508888",
    versionId: "HH_9100508888-2025-02-25",
    editedAt: "2025-02-25T16:00:00",
    editedBy: "Nguyễn Văn Tổ trưởng",
    editorRole: "Tổ dân phố",
    source: "Khảo sát tháng 02/2025",
    note: "Gia đình đông người, 2 người già.",
    snapshot: {
      id: "HH_9100508888",
      areaId: "72010",
      address: "97 Kinh Dương Vương, Q.6, TP.HCM",
      updateTime: "2025-02-25T16:00:00",
      headName: "Nguyễn Văn B",
      phone: "+849125556666",
      numberPeople: 5,
      numberChildren: 2,
      numberOlder: 1,
      vulnerabilityType: "Người già",
      cardNumber: "079123456003",
      faceUrl: "",
      status: "Inactive",
    },
  },

  // HH_9100507777
  {
    hhId: "HH_9100507777",
    versionId: "HH_9100507777-2025-03-05",
    editedAt: "2025-03-05T08:45:00",
    editedBy: "Nguyễn Văn Tổ trưởng",
    editorRole: "Tổ dân phố",
    source: "Khảo sát tháng 03/2025",
    note: "Hộ 2 người già, sức khỏe yếu.",
    snapshot: {
      id: "HH_9100507777",
      areaId: "71308",
      address: "4/2 Nguyễn Tất Thành, Q.4, TP.HCM",
      updateTime: "2025-03-05T08:45:00",
      headName: "Lê Văn C",
      phone: "+849127778888",
      numberPeople: 2,
      numberChildren: 0,
      numberOlder: 1,
      vulnerabilityType: "Người già",
      cardNumber: "",
      faceUrl: "",
      status: "Active",
    },
  },
];

let currentHousehold = null;
let isCreateMode = false;
let currentHistorySelection = null;

// Helper: datetime cho input type="datetime-local"
function getNowForInput() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes())
  );
}

function formatDateTime(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("vi-VN");
}

// ===== Render list households =====
function renderHouseholds(list) {
  const tbody = document.getElementById("householdTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  list.forEach((hh) => {
    const tr = document.createElement("tr");
    const children =
      hh.numberChildren !== undefined && hh.numberChildren !== null
        ? hh.numberChildren
        : "-";
    const older =
      hh.numberOlder !== undefined && hh.numberOlder !== null
        ? hh.numberOlder
        : "-";
    const people =
      hh.numberPeople !== undefined && hh.numberPeople !== null
        ? hh.numberPeople + " người"
        : "-";

    tr.innerHTML = `
      <td>
        <span class="household-id" data-household-id="${hh.id}">
          ${hh.id}
        </span>
      </td>
      <td>${hh.headName || "-"}</td>
      <td>${hh.phone || "-"}</td>
      <td>${hh.address || "-"}</td>
      <td>
        ${people}
        <div class="household-sub">
          Trẻ em: ${children} • Người già: ${older}
        </div>
      </td>
      <td>${hh.vulnerabilityType || "-"}</td>
      <td>
        <span class="status-pill status-${hh.status || "Inactive"}">
          ${hh.status || "Inactive"}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Click vào HH_ID => mở detail (view mode)
  document.querySelectorAll(".household-id").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-household-id");
      openHouseholdDetail(id);
    });
  });
}

// ===== Status chips =====
function updateHouseholdStatusCounts() {
  const total = demoHouseholds.length;
  const active = demoHouseholds.filter((h) => h.status === "Active").length;
  const inactive = demoHouseholds.filter((h) => h.status === "Inactive").length;

  document.getElementById("hhCountAll").textContent = total;
  document.getElementById("hhCountActive").textContent = active;
  document.getElementById("hhCountInactive").textContent = inactive;
}

// ===== Filters =====
function applyHouseholdFilters() {
  const searchInput = document.getElementById("householdSearch");
  const statusSelect = document.getElementById("householdFilterStatus");

  const searchText = (searchInput?.value || "").toLowerCase().trim();
  const selectStatus = statusSelect?.value || "";

  const activeChip = document.querySelector(".status-chip.status-chip-active");
  const chipStatus = activeChip ? activeChip.dataset.status : "";

  const statusFilter = chipStatus || selectStatus || "";

  const filtered = demoHouseholds.filter((hh) => {
    const matchSearch =
      !searchText ||
      hh.id.toLowerCase().includes(searchText) ||
      (hh.headName && hh.headName.toLowerCase().includes(searchText)) ||
      (hh.phone && hh.phone.toLowerCase().includes(searchText)) ||
      (hh.address && hh.address.toLowerCase().includes(searchText));

    const matchStatus = !statusFilter || hh.status === statusFilter;

    return matchSearch && matchStatus;
  });

  renderHouseholds(filtered);
}

function clearHouseholdFilters() {
  const search = document.getElementById("householdSearch");
  const statusSelect = document.getElementById("householdFilterStatus");

  if (search) search.value = "";
  if (statusSelect) statusSelect.value = "";

  document
    .querySelectorAll(".status-chip")
    .forEach((chip) => chip.classList.remove("status-chip-active"));

  const allChip = document.querySelector('.status-chip[data-status=""]');
  if (allChip) allChip.classList.add("status-chip-active");

  renderHouseholds(demoHouseholds);
}

// ===== Detail modal: view mode =====
function openHouseholdDetail(householdId) {
  const modal = document.getElementById("householdDetailModal");
  if (!modal) return;

  currentHousehold = demoHouseholds.find((h) => h.id === householdId);
  isCreateMode = false;
  if (!currentHousehold) return;

  const titleEl = document.getElementById("householdDetailTitle");
  if (titleEl) {
    titleEl.textContent = `Household detail – ${currentHousehold.id}`;
  }

  fillHouseholdView(currentHousehold);
  switchToHouseholdViewMode();

  const editBtn = document.getElementById("householdEditButton");
  if (editBtn) editBtn.classList.remove("hidden");

  modal.classList.remove("hidden");
}

// ===== Detail modal: create (từ nút + Thêm hộ yếu thế) =====
function openHouseholdCreate() {
  const modal = document.getElementById("householdDetailModal");
  if (!modal) return;

  currentHousehold = null;
  isCreateMode = true;

  const titleEl = document.getElementById("householdDetailTitle");
  if (titleEl) {
    titleEl.textContent = "Thêm hộ yếu thế mới";
  }

  fillHouseholdEditFields(null);
  switchToHouseholdEditMode(true);

  const editBtn = document.getElementById("householdEditButton");
  if (editBtn) editBtn.classList.add("hidden");

  modal.classList.remove("hidden");
}

// ===== Fill view section (read-only) =====
function fillHouseholdView(hh) {
  const summaryGrid = document.getElementById("householdSummaryGrid");
  const addressEl = document.getElementById("householdAddressValue");
  const areaEl = document.getElementById("householdAreaValue");
  const updateEl = document.getElementById("householdUpdateValue");
  const statusEl = document.getElementById("householdStatusValue");
  const detailTable = document.getElementById("householdDetailTable");

  if (summaryGrid) {
    summaryGrid.innerHTML = "";
    const summaryItems = [
      ["HH_ID", hh.id],
      ["Chủ hộ", hh.headName],
      ["SĐT", hh.phone],
      [
        "Tổng nhân khẩu",
        hh.numberPeople !== undefined && hh.numberPeople !== null
          ? hh.numberPeople
          : "-",
      ],
      [
        "Trẻ em (≤12)",
        hh.numberChildren !== undefined && hh.numberChildren !== null
          ? hh.numberChildren
          : "-",
      ],
      [
        "Người già (≥60)",
        hh.numberOlder !== undefined && hh.numberOlder !== null
          ? hh.numberOlder
          : "-",
      ],
      ["Nhóm dễ tổn thương", hh.vulnerabilityType],
    ];

    summaryItems.forEach(([label, value]) => {
      const div = document.createElement("div");
      div.className = "summary-item";
      div.innerHTML = `
        <div class="summary-label">${label}</div>
        <div class="summary-value">${value != null && value !== "" ? value : "-"}</div>
      `;
      summaryGrid.appendChild(div);
    });
  }

  if (addressEl) addressEl.textContent = hh.address || "-";
  if (areaEl) areaEl.textContent = hh.areaId || "-";
  if (updateEl) updateEl.textContent = formatDateTime(hh.updateTime);
  if (statusEl) statusEl.textContent = hh.status || "-";

  if (detailTable) {
    detailTable.innerHTML = "";

    const rows = [
      ["Zip code (Area_ID)", hh.areaId || "-"],
      ["Số CCCD", hh.cardNumber || "-"],
      [
        "Face ID",
        hh.faceUrl
          ? `<a href="${hh.faceUrl}" target="_blank" rel="noopener noreferrer">Xem ảnh</a>`
          : "-",
      ],
      ["Cập nhật gần nhất", formatDateTime(hh.updateTime)],
    ];

    rows.forEach(([label, value]) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="detail-label">${label}</td>
        <td class="detail-value">${value || "-"}</td>
      `;
      detailTable.appendChild(tr);
    });
  }
}

// ===== Survey history modal (per household) =====
function renderHistoryDetail(entry) {
  const detailTable = document.getElementById("householdSurveyDetailTable");
  if (!detailTable) return;

  detailTable.innerHTML = "";

  if (!entry) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td class="detail-label">Thông tin</td><td class="detail-value">Không có dữ liệu phiên bản.</td>';
    detailTable.appendChild(tr);
    return;
  }

  const hh = entry.snapshot || {};
  const rows = [
    ["HH_ID", hh.id],
    ["Zip code (Area_ID)", hh.areaId],
    ["Tên chủ hộ", hh.headName],
    ["SĐT", hh.phone],
    ["Địa chỉ", hh.address],
    ["Tổng nhân khẩu", hh.numberPeople],
    ["Trẻ em (≤12)", hh.numberChildren],
    ["Người già (≥60)", hh.numberOlder],
    ["Nhóm dễ tổn thương", hh.vulnerabilityType],
    ["Số CCCD", hh.cardNumber],
    ["Face ID", hh.faceUrl ? "Đã lưu (URL)" : "-"],
    ["Trạng thái", hh.status],
    ["Thời điểm cập nhật bản này", formatDateTime(hh.updateTime)],
  ];

  rows.forEach(([label, value]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="detail-label">${label}</td>
      <td class="detail-value">${value != null && value !== "" ? value : "-"}</td>
    `;
    detailTable.appendChild(tr);
  });
}

function renderHistoryTableForHousehold(hhId) {
  const tbody = document.getElementById("householdSurveyTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const rows = householdEditHistory
    .filter((row) => row.hhId === hhId)
    .sort((a, b) => {
      if (!a.editedAt || !b.editedAt) return 0;
      // mới nhất lên trên
      return b.editedAt.localeCompare(a.editedAt);
    });

  if (!rows.length) {
    currentHistorySelection = null;
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td colspan="5" class="detail-value" style="text-align:center; color:#9ca3af;">Chưa có lịch sử khảo sát/chỉnh sửa cho hộ này.</td>';
    tbody.appendChild(tr);
    renderHistoryDetail(null);
    return;
  }

  // default chọn bản mới nhất
  if (!currentHistorySelection) {
    currentHistorySelection = rows[0];
  }

  rows.forEach((entry, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("history-row");
    if (currentHistorySelection && currentHistorySelection.versionId === entry.versionId) {
      tr.classList.add("history-selected");
    }

    const versionLabel = `v${rows.length - index}`; // v1 = bản cũ nhất, vN = bản mới nhất
    const timeText = formatDateTime(entry.editedAt);
    const who = `${entry.editedBy || "-"}${entry.editorRole ? " (" + entry.editorRole + ")" : ""}`;

    tr.innerHTML = `
      <td>${versionLabel}</td>
      <td>${timeText}</td>
      <td>${who}</td>
      <td>${entry.source || "-"}</td>
      <td>${entry.note || "-"}</td>
    `;

    tr.addEventListener("click", () => {
      currentHistorySelection = entry;
      renderHistoryTableForHousehold(hhId); // refresh highlight
      renderHistoryDetail(entry);
    });

    tbody.appendChild(tr);
  });

  renderHistoryDetail(currentHistorySelection);
}

function openHouseholdSurveyHistory() {
  if (!currentHousehold) return;

  const modal = document.getElementById("householdSurveyModal");
  const titleEl = document.getElementById("householdSurveyTitle");
  if (!modal) return;

  currentHistorySelection = null;

  if (titleEl) {
    titleEl.textContent = `Lịch sử chỉnh sửa – ${currentHousehold.id}`;
  }

  renderHistoryTableForHousehold(currentHousehold.id);
  modal.classList.remove("hidden");
}

function closeHouseholdSurveyModal() {
  const modal = document.getElementById("householdSurveyModal");
  if (modal) modal.classList.add("hidden");
}

// ===== Fill edit form =====
function fillHouseholdEditFields(hh) {
  document.getElementById("hhIdInput").value = hh?.id || "";
  document.getElementById("hhStatusInput").value = hh?.status || "Active";
  document.getElementById("hhAreaIdInput").value = hh?.areaId || "";
  document.getElementById("hhUpdateTimeInput").value =
    hh?.updateTime ? hh.updateTime.slice(0, 16) : getNowForInput();
  document.getElementById("hhHeadNameInput").value = hh?.headName || "";
  document.getElementById("hhPhoneInput").value = hh?.phone || "";
  document.getElementById("hhAddressInput").value = hh?.address || "";
  document.getElementById("hhMembersInput").value =
    hh?.numberPeople != null ? hh.numberPeople : "";
  document.getElementById("hhChildrenInput").value =
    hh?.numberChildren != null ? hh.numberChildren : "";
  document.getElementById("hhOlderInput").value =
    hh?.numberOlder != null ? hh.numberOlder : "";
  document.getElementById("hhVulnerabilityInput").value =
    hh?.vulnerabilityType || "";
  document.getElementById("hhCardNumberInput").value = hh?.cardNumber || "";
  document.getElementById("hhFaceUrlInput").value = hh?.faceUrl || "";
}

function switchToHouseholdViewMode() {
  const viewSection = document.getElementById("householdViewSection");
  const editSection = document.getElementById("householdEditSection");
  if (viewSection) viewSection.classList.remove("hidden");
  if (editSection) editSection.classList.add("hidden");
}

function switchToHouseholdEditMode(isCreate) {
  const viewSection = document.getElementById("householdViewSection");
  const editSection = document.getElementById("householdEditSection");
  const editTitle = document.getElementById("householdEditTitle");

  if (viewSection) viewSection.classList.add("hidden");
  if (editSection) editSection.classList.remove("hidden");

  if (editTitle) {
    if (isCreate) {
      editTitle.textContent = "Thêm hộ yếu thế";
    } else if (currentHousehold) {
      editTitle.textContent = `Chỉnh sửa hộ yếu thế – ${currentHousehold.id}`;
    } else {
      editTitle.textContent = "Chỉnh sửa hộ yếu thế";
    }
  }
}

function closeHouseholdModal() {
  const modal = document.getElementById("householdDetailModal");
  if (modal) modal.classList.add("hidden");
  isCreateMode = false;
  currentHousehold = null;
}

// ===== Save (create & update) + ghi lịch sử =====
function saveHouseholdEdit() {
  const id = document.getElementById("hhIdInput").value.trim();
  const status = document.getElementById("hhStatusInput").value || "Active";
  const areaId = document.getElementById("hhAreaIdInput").value.trim();
  const updateTimeInput =
    document.getElementById("hhUpdateTimeInput").value || getNowForInput();
  const updateTimeIso = updateTimeInput.includes("T")
    ? updateTimeInput + ":00"
    : updateTimeInput;
  const headName = document.getElementById("hhHeadNameInput").value.trim();
  const phone = document.getElementById("hhPhoneInput").value.trim();
  const address = document.getElementById("hhAddressInput").value.trim();
  const membersRaw = document.getElementById("hhMembersInput").value.trim();
  const childrenRaw = document.getElementById("hhChildrenInput").value.trim();
  const olderRaw = document.getElementById("hhOlderInput").value.trim();
  const vulnerability =
    document.getElementById("hhVulnerabilityInput").value;
  const cardNumber = document
    .getElementById("hhCardNumberInput")
    .value.trim();
  const faceUrl = document.getElementById("hhFaceUrlInput").value.trim();

  if (!id) {
    alert("Vui lòng nhập HH_ID.");
    return;
  }
  if (!headName) {
    alert("Vui lòng nhập tên chủ hộ.");
    return;
  }

  const numberPeople = membersRaw ? parseInt(membersRaw, 10) : null;
  const numberChildren = childrenRaw ? parseInt(childrenRaw, 10) : null;
  const numberOlder = olderRaw ? parseInt(olderRaw, 10) : null;

  // Check trùng SĐT
  if (phone) {
    const duplicatePhone = demoHouseholds.find(
      (h) =>
        h.phone === phone &&
        (!currentHousehold || h.id !== currentHousehold.id)
    );
    if (duplicatePhone) {
      alert(
        `SĐT này đã tồn tại ở hộ ${duplicatePhone.id}. Vui lòng kiểm tra trùng SDT.`
      );
      return;
    }
  }

  // Check trùng CCCD
  if (cardNumber) {
    const duplicateCard = demoHouseholds.find(
      (h) =>
        h.cardNumber === cardNumber &&
        (!currentHousehold || h.id !== currentHousehold.id)
    );
    if (duplicateCard) {
      alert(
        `CCCD này đã tồn tại ở hộ ${duplicateCard.id}. Vui lòng kiểm tra trùng CCCD.`
      );
      return;
    }
  }

  const newObj = {
    id,
    status,
    areaId,
    updateTime: updateTimeIso,
    headName,
    phone,
    address,
    numberPeople,
    numberChildren,
    numberOlder,
    vulnerabilityType: vulnerability,
    cardNumber,
    faceUrl,
  };

  const isNewRecord = isCreateMode || !currentHousehold;

  if (isNewRecord) {
    const existingIndex = demoHouseholds.findIndex((h) => h.id === id);
    if (existingIndex >= 0) {
      demoHouseholds[existingIndex] = newObj;
    } else {
      demoHouseholds.push(newObj);
    }
    isCreateMode = false;
  } else {
    const idx = demoHouseholds.findIndex((h) => h.id === currentHousehold.id);
    if (idx >= 0) {
      demoHouseholds[idx] = newObj;
    }
  }

  // Ghi thêm 1 bản vào lịch sử chỉnh sửa (giả lập Admin cập nhật)
  const nowIso = new Date().toISOString();
  householdEditHistory.push({
    hhId: id,
    versionId: `${id}-${nowIso}`,
    editedAt: nowIso,
    editedBy: "Admin – Vân",
    editorRole: "Admin",
    source: isNewRecord
      ? "Tạo mới trên portal"
      : "Chỉnh sửa trên portal",
    note: isNewRecord
      ? "Tạo mới hộ yếu thế trên hệ thống."
      : "Cập nhật thông tin hộ yếu thế.",
    snapshot: { ...newObj },
  });

  currentHousehold = newObj;

  updateHouseholdStatusCounts();
  applyHouseholdFilters();
  fillHouseholdView(newObj);
  switchToHouseholdViewMode();
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  updateHouseholdStatusCounts();
  renderHouseholds(demoHouseholds);

  const search = document.getElementById("householdSearch");
  const statusSelect = document.getElementById("householdFilterStatus");
  const btnApply = document.getElementById("btnHouseholdApplyFilter");
  const btnClear = document.getElementById("btnHouseholdClearFilter");
  const btnAdd = document.getElementById("btnAddHousehold");

  if (search) search.addEventListener("input", applyHouseholdFilters);
  if (statusSelect)
    statusSelect.addEventListener("change", applyHouseholdFilters);
  if (btnApply) btnApply.addEventListener("click", applyHouseholdFilters);
  if (btnClear) btnClear.addEventListener("click", clearHouseholdFilters);

  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document
        .querySelectorAll(".status-chip")
        .forEach((c) => c.classList.remove("status-chip-active"));
      chip.classList.add("status-chip-active");
      applyHouseholdFilters();
    });
  });

  if (btnAdd) btnAdd.addEventListener("click", () => openHouseholdCreate());

  const btnClose = document.getElementById("householdDetailClose");
  const backdrop = document.getElementById("householdDetailBackdrop");
  const editBtn = document.getElementById("householdEditButton");
  const editCancel = document.getElementById("householdEditCancel");
  const editSave = document.getElementById("householdEditSave");

  const surveyBtn = document.getElementById("householdSurveyButton");
  const surveyClose = document.getElementById("householdSurveyClose");
  const surveyBackdrop = document.getElementById("householdSurveyBackdrop");

  if (btnClose) btnClose.addEventListener("click", closeHouseholdModal);
  if (backdrop) backdrop.addEventListener("click", closeHouseholdModal);

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      fillHouseholdEditFields(currentHousehold);
      switchToHouseholdEditMode(false);
    });
  }

  if (editCancel) {
    editCancel.addEventListener("click", () => {
      if (isCreateMode || !currentHousehold) {
        closeHouseholdModal();
      } else {
        switchToHouseholdViewMode();
      }
    });
  }

  if (editSave) {
    editSave.addEventListener("click", saveHouseholdEdit);
  }

  if (surveyBtn) surveyBtn.addEventListener("click", openHouseholdSurveyHistory);
  if (surveyClose) surveyClose.addEventListener("click", closeHouseholdSurveyModal);
  if (surveyBackdrop)
    surveyBackdrop.addEventListener("click", closeHouseholdSurveyModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeHouseholdSurveyModal();
      closeHouseholdModal();
    }
  });
});
