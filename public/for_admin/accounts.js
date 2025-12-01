// ==== MOCK DATA – sau này bạn thay bằng API backend ====
// Mỗi account có cấu trúc:
// { id, role: 'VOLUNTEER' | 'CL' | 'HH', fullName, phone, registeredAt, status, docs: [{type, filename}], rejectReason? }
const accountsData = [
  {
    id: 1,
    role: "VOLUNTEER",
    fullName: "Nguyễn Văn A",
    phone: "0901 234 567",
    registeredAt: "2025-11-15",
    status: "PENDING",
    docs: [
      { type: "CCCD mặt trước", filename: "nguyenvana_cccd_front.jpg" },
      { type: "CCCD mặt sau",  filename: "nguyenvana_cccd_back.jpg" },
      { type: "Bằng lái",      filename: "nguyenvana_license.jpg" }
    ]
  },
  {
    id: 2,
    role: "CL",
    fullName: "Trần Thị B",
    phone: "0987 654 321",
    registeredAt: "2025-11-18",
    status: "PENDING",
    docs: [
      { type: "CCCD",    filename: "tranthib_cccd.jpg" },
      { type: "Giấy CL", filename: "tranthib_cl_cert.pdf" }
    ]
  },
  {
    id: 3,
    role: "HH",
    fullName: "Hộ gia đình C",
    phone: "0912 345 678",
    registeredAt: "2025-11-20",
    status: "PENDING",
    docs: [
      { type: "CCCD chủ hộ", filename: "hogiadinhc_owner_cccd.jpg" },
      { type: "Sổ hộ khẩu",  filename: "hogiadinhc_shk.pdf" }
    ]
  }
];

let selectedAccountId = null;

// Key dùng chung với login.html để lưu các tài khoản mới đăng ký đang PENDING
const PENDING_ACCOUNTS_STORAGE_KEY = "fb_pendingAccounts";

// ====== ĐỌC / GHI localStorage cho pending accounts ======
function loadPendingAccountsFromStorage() {
  try {
    const raw = localStorage.getItem(PENDING_ACCOUNTS_STORAGE_KEY);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return;

    arr.forEach((stored) => {
      if (!stored || typeof stored !== "object") return;
      const exists = accountsData.some((acc) => acc.id === stored.id);
      if (!exists) {
        accountsData.push(stored);
      }
    });
  } catch (err) {
    console.error("Không thể load pendingAccounts từ localStorage", err);
  }
}

function syncPendingAccountsToStorage() {
  try {
    // Chỉ lưu lại những bản ghi status = PENDING
    const pending = accountsData.filter((acc) => acc.status === "PENDING");
    localStorage.setItem(
      PENDING_ACCOUNTS_STORAGE_KEY,
      JSON.stringify(pending)
    );
  } catch (err) {
    console.error("Không thể lưu pendingAccounts xuống localStorage", err);
  }
}

// ====== helpers ======
function getRoleBadgeClass(role) {
  switch (role) {
    case "VOLUNTEER":
      return "badge badge-volunteer";
    case "CL":
      return "badge badge-cl";
    case "HH":
      return "badge badge-hh";
    default:
      return "badge";
  }
}

function getRoleLabel(role) {
  switch (role) {
    case "VOLUNTEER":
      return "Volunteer";
    case "CL":
      return "Communication Leader";
    case "HH":
      return "Household";
    default:
      return role;
  }
}

function renderAccountsTable() {
  const tbody = document.getElementById("accountsTableBody");
  const filterRoleSelect = document.getElementById("filterRole");
  const searchInput = document.getElementById("searchInput");

  if (!tbody || !filterRoleSelect || !searchInput) return;

  const filterRole = filterRoleSelect.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  tbody.innerHTML = "";

  const filtered = accountsData.filter((acc) => {
    // Chỉ hiển thị các account còn PENDING
    if (acc.status !== "PENDING") return false;
    if (filterRole !== "all" && acc.role !== filterRole) return false;

    if (!searchTerm) return true;

    const text = `${acc.fullName || ""} ${acc.phone || ""}`.toLowerCase();
    return text.includes(searchTerm);
  });

  filtered.forEach((acc) => {
    const tr = document.createElement("tr");
    tr.dataset.accountId = acc.id;

    if (acc.id === selectedAccountId) {
      tr.classList.add("active-row");
    }

    // Role
    const tdRole = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = getRoleBadgeClass(acc.role);
    badge.textContent = getRoleLabel(acc.role);
    tdRole.appendChild(badge);

    // Name
    const tdName = document.createElement("td");
    tdName.className = "cell-name";
    tdName.textContent = acc.fullName || "-";

    // Phone
    const tdPhone = document.createElement("td");
    tdPhone.textContent = acc.phone || "-";

    // Registered date
    const tdReg = document.createElement("td");
    tdReg.textContent = acc.registeredAt || "-";

    // Status (luôn Pending trong list này, nhưng vẫn theo status thực tế)
    const tdStatus = document.createElement("td");
    const statusSpan = document.createElement("span");
    let statusClass = "status-pending";
    let statusText = "Pending";
    if (acc.status === "APPROVED") {
      statusClass = "status-approved";
      statusText = "Approved";
    } else if (acc.status === "REJECTED") {
      statusClass = "status-rejected";
      statusText = "Rejected";
    }
    statusSpan.className = `status-pill ${statusClass}`;
    statusSpan.textContent = statusText;
    tdStatus.appendChild(statusSpan);

    // View btn
    const tdView = document.createElement("td");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "view-btn";
    btn.textContent = "View";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleSelectAccount(acc.id);
    });
    tdView.appendChild(btn);

    tr.appendChild(tdRole);
    tr.appendChild(tdName);
    tr.appendChild(tdPhone);
    tr.appendChild(tdReg);
    tr.appendChild(tdStatus);
    tr.appendChild(tdView);

    tr.addEventListener("click", () => handleSelectAccount(acc.id));

    tbody.appendChild(tr);
  });

  const countLabel = document.getElementById("tableCountLabel");
  if (countLabel) {
    countLabel.textContent = `${filtered.length} tài khoản pending`;
  }
}

function handleSelectAccount(accountId) {
  selectedAccountId = accountId;
  renderAccountsTable(); // để update active-row

  const acc = accountsData.find((a) => a.id === accountId);
  if (!acc) return;

  const emptyState = document.getElementById("detailEmptyState");
  const detailContent = document.getElementById("detailContent");

  if (!emptyState || !detailContent) return;

  emptyState.style.display = "none";
  detailContent.classList.remove("hidden");
  detailContent.style.display = "block";

  const nameEl = document.getElementById("detailName");
  const roleBadge = document.getElementById("detailRoleBadge");
  const phoneEl = document.getElementById("detailPhone");
  const regAtEl = document.getElementById("detailRegisteredAt");

  if (nameEl) nameEl.textContent = acc.fullName || "-";
  if (roleBadge) {
    roleBadge.className = getRoleBadgeClass(acc.role);
    roleBadge.textContent = getRoleLabel(acc.role);
  }
  if (phoneEl) phoneEl.textContent = acc.phone || "-";
  if (regAtEl) regAtEl.textContent = acc.registeredAt || "-";

  const docsGrid = document.getElementById("detailDocsGrid");
  if (docsGrid) {
    docsGrid.innerHTML = "";
    if (!acc.docs || acc.docs.length === 0) {
      const empty = document.createElement("div");
      empty.className = "helper-text";
      empty.textContent = "Chưa upload hồ sơ.";
      docsGrid.appendChild(empty);
    } else {
      acc.docs.forEach((doc) => {
        const card = document.createElement("div");
        card.className = "doc-card";

        const label = document.createElement("div");
        label.className = "doc-label";
        label.textContent = doc.type || "Tài liệu";

        const filename = document.createElement("div");
        filename.className = "doc-filename";
        filename.textContent = doc.filename || "(chưa có tên tệp)";

        card.appendChild(label);
        card.appendChild(filename);
        docsGrid.appendChild(card);
      });
    }
  }

  // clear lý do reject khi chọn record mới
  const rejectReasonInput = document.getElementById("rejectReason");
  if (rejectReasonInput) {
    rejectReasonInput.value = acc.rejectReason || "";
  }
}

function updateAccountStatus(newStatus, reason) {
  if (!selectedAccountId) {
    alert("Vui lòng chọn một tài khoản trước.");
    return;
  }

  const acc = accountsData.find((a) => a.id === selectedAccountId);
  if (!acc) return;

  if (newStatus === "REJECTED" && !reason.trim()) {
    alert("Vui lòng nhập lý do từ chối.");
    return;
  }

  // Cập nhật local data – sau này bạn call API ở đây
  acc.status = newStatus;
  acc.rejectReason = reason || null;

  // Đồng bộ lại localStorage để Login/Accounts cùng nhìn thấy danh sách pending giống nhau
  syncPendingAccountsToStorage();

  // Sau khi phê duyệt xong thì bỏ record khỏi list pending
  selectedAccountId = null;
  renderAccountsTable();

  const detailContent = document.getElementById("detailContent");
  const empty = document.getElementById("detailEmptyState");
  if (detailContent && empty) {
    detailContent.style.display = "none";
    detailContent.classList.add("hidden");
    empty.style.display = "block";
    empty.textContent =
      newStatus === "APPROVED"
        ? "Tài khoản đã được APPROVE và sẽ không còn trong danh sách pending."
        : "Tài khoản đã bị REJECT và sẽ không còn trong danh sách pending.";
  }

  alert(
    newStatus === "APPROVED"
      ? "Đã approve tài khoản."
      : "Đã reject tài khoản."
  );
}

// ====== init ======
document.addEventListener("DOMContentLoaded", () => {
  // Load các tài khoản pending được lưu từ trang đăng ký (login.html)
  loadPendingAccountsFromStorage();
  renderAccountsTable();

  const filterRoleSelect = document.getElementById("filterRole");
  const searchInput = document.getElementById("searchInput");
  const btnApprove = document.getElementById("btnApprove");
  const btnReject = document.getElementById("btnReject");
  const rejectReasonInput = document.getElementById("rejectReason");

  if (filterRoleSelect) {
    filterRoleSelect.addEventListener("change", () => {
      renderAccountsTable();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderAccountsTable();
    });
  }

  if (btnApprove) {
    btnApprove.addEventListener("click", () => {
      updateAccountStatus(
        "APPROVED",
        (rejectReasonInput && rejectReasonInput.value) || ""
      );
    });
  }

  if (btnReject) {
    btnReject.addEventListener("click", () => {
      const reason = (rejectReasonInput && rejectReasonInput.value) || "";
      updateAccountStatus("REJECTED", reason);
    });
  }
});
