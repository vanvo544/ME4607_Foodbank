// ====== DATA DEMO CHO CAMPAIGN ======
const campaigns = [
  {
    id: "CP_2025001",
    status: "InTransit", // dùng lại màu pill của trip.css
    name: "Chiến dịch Mái ấm Nhật Hồng",
    district: "Thủ Đức",
    ward: "Linh Trung",
    daysLeft: 7,
    volunteersJoined: 18,
    volunteersTarget: 30,
    timeText: "15.08.2025 – 25.08.2025",
    venue: "Nhà văn hóa Linh Trung",
    note: "Ưu tiên phân phát cho các hộ gia đình có trẻ em.",
    // ảnh nhà văn hóa (bạn thay đường dẫn thực tế)
    image: "assets/nha-van-hoa-linh-trung.jpg",
    // các điểm để vẽ polyline + marker trên map
    route: [
      [10.869, 106.629], // Kho / điểm xuất phát
      [10.874, 106.646], // Community 1
      [10.878, 106.657]  // Nhà văn hóa
    ]
  },
  {
    id: "CP_2025002",
    status: "Upcoming",
    name: "Chiến dịch Trung thu yêu thương",
    district: "Quận 4",
    ward: "Phường 8",
    daysLeft: 15,
    volunteersJoined: 5,
    volunteersTarget: 20,
    timeText: "01.09.2025 – 10.09.2025",
    venue: "Nhà văn hóa Phường 8",
    note: "Tập trung phát quà cho trẻ em khu nhà trọ.",
    image: "assets/nha-van-hoa-q4.jpg",
    route: [
      [10.759, 106.706],
      [10.757, 106.713]
    ]
  },
  {
    id: "CP_2025003",
    status: "Delivered",
    name: "Chiến dịch Xuân sẻ chia",
    district: "Bình Tân",
    ward: "An Lạc",
    daysLeft: 0,
    volunteersJoined: 40,
    volunteersTarget: 40,
    timeText: "10.01.2025 – 25.01.2025",
    venue: "Nhà văn hóa An Lạc",
    note: "Đã hoàn thành, đang chờ tổng kết.",
    image: "assets/nha-van-hoa-bt.jpg",
    route: [
      [10.752, 106.603],
      [10.748, 106.615]
    ]
  }
];

// ====== STATE & ELEMENTS ======
let currentStatusFilter = "ALL";
let selectedCampaignId = null;

let map;
let routeLayer;
let markerGroup;

const listEl = document.getElementById("campaignList");
const searchInput = document.getElementById("campaignSearch");
const chipButtons = document.querySelectorAll(".chips-row .chip");

// Detail elements
const detailIdEl = document.getElementById("detailCampaignId");
const detailStatusEl = document.getElementById("detailCampaignStatus");
const detailNameEl = document.getElementById("detailCampaignName");
const detailTimeEl = document.getElementById("detailCampaignTime");
const detailVenueEl = document.getElementById("detailCampaignVenue");
const detailNoteEl = document.getElementById("detailCampaignNote");
const detailDistrictEl = document.getElementById("detailCampaignDistrict");
const detailWardEl = document.getElementById("detailCampaignWard");
const detailVolJoinedEl = document.getElementById("detailCampaignVolJoined");
const detailVolTargetEl = document.getElementById("detailCampaignVolTarget");
const detailDaysLeftEl = document.getElementById("detailCampaignDaysLeft");

// ====== HELPERS ======
function getStatusPillClass(status) {
  if (status === "InTransit") return "status-InTransit";
  if (status === "Delivered") return "status-Delivered";
  if (status === "Upcoming") return "status-Upcoming";
  return "";
}

function getStatusText(status) {
  if (status === "InTransit") return "Đang chạy";
  if (status === "Delivered") return "Hoàn thành";
  if (status === "Upcoming") return "Sắp diễn ra";
  return status;
}

function formatDaysLeft(days) {
  if (days <= 0) return "Hết hạn đăng ký";
  if (days === 1) return "Còn 1 ngày đăng ký";
  return `Còn ${days} ngày đăng ký`;
}

// Tính % progress TNV
function getVolunteerPercent(c) {
  if (!c.volunteersTarget) return 0;
  return Math.min(100, (c.volunteersJoined / c.volunteersTarget) * 100);
}

// Lọc theo search + status
function getFilteredCampaigns() {
  const term = (searchInput.value || "").toLowerCase().trim();

  return campaigns.filter((c) => {
    const matchStatus =
      currentStatusFilter === "ALL" || c.status === currentStatusFilter;

    const matchSearch =
      !term ||
      c.id.toLowerCase().includes(term) ||
      c.name.toLowerCase().includes(term) ||
      c.district.toLowerCase().includes(term) ||
      c.ward.toLowerCase().includes(term);

    return matchStatus && matchSearch;
  });
}

// ====== RENDER LIST CỘT 2 ======
function renderCampaignList() {
  const filtered = getFilteredCampaigns();

  if (!filtered.length) {
    listEl.innerHTML =
      '<div style="font-size:0.8rem;color:#6b7280;">Không có campaign phù hợp.</div>';
    return;
  }

  listEl.innerHTML = filtered
    .map((c) => {
      const percent = getVolunteerPercent(c);
      const isActive = c.id === selectedCampaignId;
      const activeClass = isActive ? " active" : "";
      const statusClass = getStatusPillClass(c.status);
      const statusText = getStatusText(c.status);
      const daysText = formatDaysLeft(c.daysLeft);

      return `
        <div class="trip-card campaign-card${activeClass}" data-id="${c.id}">
          <div class="campaign-card-inner">
            ${
              c.image
                ? `
                <div class="campaign-thumb-wrapper">
                  <img
                    src="${c.image}"
                    class="campaign-thumbnail"
                    
                  />
                </div>
              `
                : ""
            }
            <div class="campaign-info">
              <div class="trip-card-header">
                <!-- DÒNG 1: Campaign ID + Status -->
                <div class="trip-id">#${c.id}</div>
                <div class="status-pill ${statusClass}">${statusText}</div>
              </div>

              <div class="trip-card-body">
                <!-- DÒNG 2: Tên campaign -->
                <div class="campaign-name">${c.name}</div>

                <!-- DÒNG 3: Quận – số ngày còn lại -->
                <div class="campaign-location">
                  ${c.district} – ${daysText}
                </div>

                <!-- DÒNG 4: Thanh bar tiến độ -->
                <div class="campaign-progress">
                  <div class="campaign-progress-bar" style="width:${percent}%"></div>
                </div>

                <!-- DÒNG 5: Số TNV -->
                <div class="campaign-volunteers">
                  ${c.volunteersJoined}/${c.volunteersTarget} TNV đã tham gia
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}


// ====== DETAIL PANEL CỘT 3 ======
function renderCampaignDetail(campaign) {
  if (!campaign) return;

  detailIdEl.textContent = campaign.id;
  detailStatusEl.textContent = getStatusText(campaign.status);
  detailStatusEl.className = `status-pill ${getStatusPillClass(
    campaign.status
  )}`;

  detailNameEl.textContent = campaign.name;
  detailTimeEl.textContent = campaign.timeText;
  detailVenueEl.textContent = campaign.venue;
  detailNoteEl.textContent = campaign.note || "–";
  detailDistrictEl.textContent = campaign.district;
  detailWardEl.textContent = campaign.ward;
  detailVolJoinedEl.textContent = campaign.volunteersJoined;
  detailVolTargetEl.textContent = campaign.volunteersTarget;
  detailDaysLeftEl.textContent = campaign.daysLeft;

  updateMapRoute(campaign);
}

// ====== MAP (CỘT 3 BÊN PHẢI) ======
function initMap() {
  map = L.map("campaignMap").setView([10.78, 106.70], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  routeLayer = L.polyline([], { color: "#2563eb", weight: 3 });
  routeLayer.addTo(map);

  markerGroup = L.layerGroup().addTo(map);
}

function updateMapRoute(campaign) {
  if (!map || !campaign.route || !campaign.route.length) return;

  markerGroup.clearLayers();
  routeLayer.setLatLngs(campaign.route);

  campaign.route.forEach((point, idx) => {
    const [lat, lng] = point;
    const marker = L.marker([lat, lng]).addTo(markerGroup);

    if (idx === campaign.route.length - 1) {
      marker.bindPopup("Nhà văn hóa tập kết");
    } else if (idx === 0) {
      marker.bindPopup("Kho / điểm xuất phát");
    } else {
      marker.bindPopup(`Điểm ${idx + 1}`);
    }
  });

  map.fitBounds(routeLayer.getBounds(), {
    padding: [20, 20]
  });
}

// ====== EVENT HANDLERS ======
function onCardClick(e) {
  const card = e.target.closest(".campaign-card");
  if (!card) return;

  const id = card.getAttribute("data-id");
  const campaign = campaigns.find((c) => c.id === id);
  if (!campaign) return;

  selectedCampaignId = id;
  renderCampaignList();
  renderCampaignDetail(campaign);
}

function onSearchChange() {
  renderCampaignList();

  // Giữ detail nếu campaign đang chọn vẫn còn trong list
  const current = campaigns.find((c) => c.id === selectedCampaignId);
  if (current) renderCampaignDetail(current);
}

function onChipClick(e) {
  chipButtons.forEach((btn) => btn.classList.remove("chip-active"));
  e.target.classList.add("chip-active");

  currentStatusFilter = e.target.getAttribute("data-status") || "ALL";
  renderCampaignList();

  // nếu campaign đang chọn không còn trong filter -> chọn campaign đầu tiên
  const filtered = getFilteredCampaigns();
  if (!filtered.length) return;

  if (!filtered.some((c) => c.id === selectedCampaignId)) {
    selectedCampaignId = filtered[0].id;
    renderCampaignList();
    renderCampaignDetail(filtered[0]);
  }
}

// ====== INIT ======
function initCampaignPage() {
  // Nếu có nút add demo thì chỉ log tạm
  const btnAdd = document.getElementById("btnAddCampaign");
  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      alert("Demo only – tính năng thêm campaign sẽ được triển khai sau.");
    });
  }

  if (listEl) {
    listEl.addEventListener("click", onCardClick);
  }

  if (searchInput) {
    searchInput.addEventListener("input", onSearchChange);
  }

  chipButtons.forEach((btn) =>
    btn.addEventListener("click", onChipClick)
  );

  initMap();

  // Chọn campaign đầu tiên làm default
  if (campaigns.length > 0) {
    selectedCampaignId = campaigns[0].id;
    renderCampaignList();
    renderCampaignDetail(campaigns[0]);
  }
}

document.addEventListener("DOMContentLoaded", initCampaignPage);
