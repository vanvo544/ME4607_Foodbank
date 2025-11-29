// ==== MOCK DATA – sau này bạn thay bằng API backend ====
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
    phone: "0908 888 222",
    registeredAt: "2025-11-18",
    status: "PENDING",
    docs: [
      { type: "CCCD",     filename: "tranthib_cccd.jpg" },
      { type: "Giấy CL",  filename: "tranthib_cl_cert.pdf" }
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

// ====== helpers ======
function getRoleBadgeClass(role) {
  switch (role) {
    case "VOLUNTEER": return "badge badge-volunteer";
    case "CL":        return "badge badge-cl";
    case "HH":        return "badge badge-hh";
    default:          return "badge";
  }
}

function getRoleLabel(role) {
  switch (role) {
    case "VOLUNTEER": return "Volunteer";
    case "CL":        return "Communication Leader";
    case "HH":        return "Household";
    default:          return role;
  }
}

function renderAccountsTable() {
  const tbody = document.getElementById("accountsTableBody");
  const filterRole = document.getElementById("filterRole").value;
  const searchTerm = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

  tbody.innerHTML = "";

  const filtered = accountsData.filter(acc => {
    if (acc.status !== "PENDING") return false; // chỉ hiển thị pending
    if (filterRole !== "all" && acc.role !== filterRole) return false;
    if (!searchTerm) return true;

    const text = (acc.fullName + " " + acc.phone).toLowerCase();
    return text.includes(searchTerm);
  });

  filtered.forEach(acc => {
    const tr = document.createElement("tr");
    tr.dataset.accountId = acc.id;

    if (acc.id === selectedAccountId) {
      tr.classList.add("active-row");
    }

    const tdRole = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = getRoleBadgeClass(acc.role);
    badge.textContent = getRoleLabel(acc.role);
    tdRole.appendChild(badge);

    const tdName = document.createElement("td");
    tdName.className = "cell-name";
    tdName.textContent = acc.fullName;

    const tdPhone = document.createElement("td");
    tdPhone.textContent = acc.phone;

    const tdReg = document.createElement("td");
    tdReg.textContent = acc.registeredAt;

    const tdStatus = document.createElement("td");
    const statusSpan = document.createElement("span");
    statusSpan.className = "status-pill status-pending";
    statusSpan.textContent = "Pending";
    tdStatus.appendChild(statusSpan);

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

  document.getElementById("tableCountLabel").textContent =
    `${filtered.length} tài khoản pending`;
}

function handleSelectAccount(accountId) {
  selectedAccountId = accountId;
  renderAccountsTable(); // để update active-row

  const acc = accountsData.find(a => a.id === accountId);
  if (!acc) return;

  // Ẩn empty state, show content
  document.getElementById("detailEmptyState").style.display = "none";
  document.getElementById("detailContent").style.display = "block";

  document.getElementById("detailName").textContent = acc.fullName;
  const roleBadge = document.getElementById("detailRoleBadge");
  roleBadge.className = getRoleBadgeClass(acc.role);
  roleBadge.textContent = getRoleLabel(acc.role);
  document.getElementById("detailPhone").textContent = acc.phone;
  document.getElementById("detailRegisteredAt").textContent = acc.registeredAt;

  const docsGrid = document.getElementById("detailDocsGrid");
  docsGrid.innerHTML = "";
  if (!acc.docs || acc.docs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "helper-text";
    empty.textContent = "Chưa upload hồ sơ.";
    docsGrid.appendChild(empty);
  } else {
    acc.docs.forEach(doc => {
      const card = document.createElement("div");
      card.className = "doc-card";

      const label = document.createElement("div");
      label.className = "doc-label";
      label.textContent = doc.type;

      const filename = document.createElement("div");
      filename.className = "doc-filename";
      filename.textContent = doc.filename;

      card.appendChild(label);
      card.appendChild(filename);
      docsGrid.appendChild(card);
    });
  }

  // clear lý do reject khi chọn record mới
  document.getElementById("rejectReason").value = "";
}

function updateAccountStatus(newStatus, reason) {
  if (!selectedAccountId) {
    alert("Vui lòng chọn một tài khoản trước.");
    return;
  }

  const acc = accountsData.find(a => a.id === selectedAccountId);
  if (!acc) return;

  if (newStatus === "REJECTED" && !reason.trim()) {
    alert("Vui lòng nhập lý do từ chối.");
    return;
  }

  // Tạm thời chỉ update local – sau này bạn call API ở đây
  acc.status = newStatus;
  acc.rejectReason = reason || null;

  // Sau khi phê duyệt xong thì bỏ record khỏi list pending
  selectedAccountId = null;
  renderAccountsTable();

  document.getElementById("detailContent").style.display = "none";
  const empty = document.getElementById("detailEmptyState");
  empty.style.display = "block";
  empty.textContent =
    newStatus === "APPROVED"
      ? "Tài khoản đã được APPROVE và sẽ không còn trong danh sách pending."
      : "Tài khoản đã bị REJECT và sẽ không còn trong danh sách pending.";

  alert(
    newStatus === "APPROVED"
      ? "Đã approve tài khoản."
      : "Đã reject tài khoản."
  );
}

// ====== init ======
document.addEventListener("DOMContentLoaded", () => {
  renderAccountsTable();

  document.getElementById("filterRole").addEventListener("change", () => {
    renderAccountsTable();
  });

  document.getElementById("searchInput").addEventListener("input", () => {
    renderAccountsTable();
  });

  document.getElementById("btnApprove").addEventListener("click", () => {
    updateAccountStatus("APPROVED", "");
  });

  document.getElementById("btnReject").addEventListener("click", () => {
    const reason = document.getElementById("rejectReason").value || "";
    updateAccountStatus("REJECTED", reason);
  });
});
