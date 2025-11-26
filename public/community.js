// Demo data cho Tổ dân phố
const demoCommunities = [
  {
    id: "CL_700001",
    leader: "Nguyễn Thị Lan",
    phone: "0909 111 222",
    ward: "P.8",
    district: "Q.4",
    areaCode: "Area 700000",
    households: 30,
    campaigns: "CP_2025001",
    status: "Active",
  },
  {
    id: "CL_700002",
    leader: "Trần Văn Phúc",
    phone: "0909 222 333",
    ward: "P.19",
    district: "Bình Thạnh",
    areaCode: "Area 71300",
    households: 25,
    campaigns: "CP_2025002",
    status: "Active",
  },
  {
    id: "CL_713080",
    leader: "Lê Minh Tâm",
    phone: "0913 555 666",
    ward: "Linh Trung",
    district: "Thủ Đức",
    areaCode: "Area 71308",
    households: 40,
    campaigns: "CP_2025001, CP_2025003",
    status: "Active",
  },
  {
    id: "CL_700010",
    leader: "Phạm Văn Cường",
    phone: "0903 777 888",
    ward: "P.1",
    district: "Q.5",
    areaCode: "Area 70010",
    households: 18,
    campaigns: "",
    status: "Inactive",
  },
];

function getCommunityStatusStyle(status) {
  switch (status) {
    case "Active":
      return "background:#dbeafe;color:#1d4ed8;";
    case "Inactive":
      return "background:#e5e7eb;color:#4b5563;";
    default:
      return "background:#e5e7eb;color:#4b5563;";
  }
}

function renderCommunities(list) {
  const tbody = document.getElementById("commTableBody");
  tbody.innerHTML = "";

  list.forEach((c) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><span class="order-id">${c.id}</span></td>
      <td>${c.leader}</td>
      <td>${c.phone}</td>
      <td>${c.ward}</td>
      <td>${c.district}</td>
      <td>${c.areaCode}</td>
      <td>${c.households}</td>
      <td>${c.campaigns || "<span class='household-sub'>Không có</span>"}</td>
      <td>
        <span class="status-pill" style="${getCommunityStatusStyle(c.status)}">
          ${c.status}
        </span>
      </td>
      <td class="col-action">
        <button class="table-action-btn" data-comm="${c.id}">View</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.querySelectorAll(".table-action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-comm");
      alert("Demo: Xem chi tiết Tổ dân phố " + id);
    });
  });
}

function populateCommunityFilters() {
  const distSelect = document.getElementById("commFilterDistrict");
  const wardSelect = document.getElementById("commFilterWard");

  const districts = Array.from(new Set(demoCommunities.map((c) => c.district)));
  const wards = Array.from(new Set(demoCommunities.map((c) => c.ward)));

  districts.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    distSelect.appendChild(opt);
  });

  wards.forEach((w) => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = w;
    wardSelect.appendChild(opt);
  });
}

function updateCommunityCounts() {
  const total = demoCommunities.length;
  const active = demoCommunities.filter((c) => c.status === "Active").length;
  const inactive = demoCommunities.filter((c) => c.status === "Inactive").length;

  document.getElementById("commCountAll").textContent = total;
  document.getElementById("commCountActive").textContent = active;
  document.getElementById("commCountInactive").textContent = inactive;
}

function applyCommunityFilters() {
  const searchText = document
    .getElementById("commSearch")
    .value.toLowerCase()
    .trim();
  const statusSelect = document.getElementById("commFilterStatus").value;
  const distSelect = document.getElementById("commFilterDistrict").value;
  const wardSelect = document.getElementById("commFilterWard").value;

  const activeChip = document.querySelector(".status-chip-active");
  const chipStatus = activeChip ? activeChip.dataset.status : "";

  const statusFilter = chipStatus || statusSelect || "";

  const filtered = demoCommunities.filter((c) => {
    const matchSearch =
      !searchText ||
      c.id.toLowerCase().includes(searchText) ||
      c.leader.toLowerCase().includes(searchText) ||
      c.ward.toLowerCase().includes(searchText) ||
      c.district.toLowerCase().includes(searchText);

    const matchStatus = !statusFilter || c.status === statusFilter;
    const matchDistrict = !distSelect || c.district === distSelect;
    const matchWard = !wardSelect || c.ward === wardSelect;

    return matchSearch && matchStatus && matchDistrict && matchWard;
  });

  renderCommunities(filtered);
}

function clearCommunityFilters() {
  document.getElementById("commSearch").value = "";
  document.getElementById("commFilterStatus").value = "";
  document.getElementById("commFilterDistrict").value = "";
  document.getElementById("commFilterWard").value = "";

  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.classList.remove("status-chip-active");
  });
  document
    .querySelector('.status-chip[data-status=""]')
    .classList.add("status-chip-active");

  renderCommunities(demoCommunities);
}

// Khởi động
document.addEventListener("DOMContentLoaded", () => {
  populateCommunityFilters();
  updateCommunityCounts();
  renderCommunities(demoCommunities);

  document
    .getElementById("commSearch")
    .addEventListener("input", applyCommunityFilters);
  document
    .getElementById("commFilterStatus")
    .addEventListener("change", applyCommunityFilters);
  document
    .getElementById("commFilterDistrict")
    .addEventListener("change", applyCommunityFilters);
  document
    .getElementById("commFilterWard")
    .addEventListener("change", applyCommunityFilters);

  document
    .getElementById("commBtnApply")
    .addEventListener("click", applyCommunityFilters);
  document
    .getElementById("commBtnClear")
    .addEventListener("click", clearCommunityFilters);

  document.querySelectorAll(".status-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".status-chip").forEach((c) =>
        c.classList.remove("status-chip-active")
      );
      chip.classList.add("status-chip-active");
      applyCommunityFilters();
    });
  });
});
