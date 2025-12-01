// ===== CAMPAIGNS PAGE - Chiến dịch =====

// Demo data
const campaigns = [
  {
    id: "CP_2025001",
    status: "Delivering",
    name: "Mái ấm Nhật Hồng",
    district: "Thủ Đức",
    ward: "Linh Trung",
    startDate: "15.08.2025",
    endDate: "25.08.2025",
    volunteersJoined: 18,
    volunteersTarget: 30,
    venue: "Nhà văn hóa Linh Trung",
    note: "Ưu tiên phân phát cho các hộ gia đình có trẻ em.",
    avatar: "MÂN",
    image: "assets/nha-van-hoa-linh-trung.jpg"
  },
  {
    id: "CP_2025002",
    status: "Recruiting",
    name: "Trung thu yêu thương",
    district: "Quận 4",
    ward: "Phường 8",
    startDate: "01.09.2025",
    endDate: "10.09.2025",
    volunteersJoined: 5,
    volunteersTarget: 20,
    venue: "Nhà văn hóa Phường 8",
    note: "Tập trung phát quà cho trẻ em khu nhà trọ.",
    avatar: "TTyT",
    image: "assets/nha-van-hoa-q4.jpg"
  },
  {
    id: "CP_2025003",
    status: "Closed",
    name: "Xuân sẻ chia",
    district: "Bình Tân",
    ward: "An Lạc",
    startDate: "10.01.2025",
    endDate: "25.01.2025",
    volunteersJoined: 40,
    volunteersTarget: 40,
    venue: "Nhà văn hóa An Lạc",
    note: "Đã hoàn thành, đang chờ tổng kết.",
    avatar: "XSC",
    image: "assets/nha-van-hoa-bt.jpg"
  }
];

// Volunteer history
const volunteerCampaignHistory = [
  {
    id: "VCP_202500001",
    campaignId: "CP_2025001",
    campaignName: "Mái ấm Nhật Hồng",
    joinedDate: "2025-08-10",
    status: "InProgress", // InProgress, Completed
    assignmentCount: 5,
    completedCount: 3,
    progressPercent: 60,
    district: "Thủ Đức",
    ward: "Linh Trung",
    venue: "Nhà văn hóa Linh Trung",
    avatar: "MA",
    route: [
      [10.869, 106.629],
      [10.874, 106.646],
      [10.878, 106.657]
    ]
  },
  {
    id: "VCP_202500002",
    campaignId: "CP_2025003",
    campaignName: "Xuân sẻ chia",
    joinedDate: "2025-01-09",
    status: "Completed",
    assignmentCount: 10,
    completedCount: 10,
    progressPercent: 100,
    district: "Bình Tân",
    ward: "An Lạc",
    venue: "Nhà văn hóa An Lạc",
    avatar: "XSC",
    route: [
      [10.752, 106.603],
      [10.748, 106.615]
    ]
  }
];

// Volunteer orders for the campaigns
const volunteerOrders = [
  {
    id: "#1248F9A0",
    status: "Delivered",
    campaignId: "CP_2025001",
    household: "Trần Văn Hùng",
    address: "342 Nguyễn Văn Bồn, Phường 13, Quận 4",
    warehouse: "WH_0002 – Kho Quận 4",
    packageCount: 5,
    totalWeight: 45,
    wardPhoneNumber: "028 3932 0000",
    householdPhoneNumber: "0901 234 567",
    created: "2025-03-01 07:15",
    completed: "2025-03-01 08:05",
    routePoints: [
      { lat: 10.7626, lng: 106.7083, label: "Kho WH_0002" },
      { lat: 10.767, lng: 106.7065, label: "Hộ Trần Văn Hùng" }
    ],
    gpsLogs: [
      { time: "07:15", address: "Kho WH_0002", speed: 0 },
      { time: "07:17", address: "Đ. Khánh Hội", speed: 20 },
      { time: "07:20", address: "Hộ Trần Văn Hùng", speed: 3 }
    ]
  },
  {
    id: "#25ACDB12",
    status: "Pickuped",
    campaignId: "CP_2025001",
    household: "Nguyễn Thị Hoa",
    address: "256 Lê Văn Lương, Phường Linh Trung, Quận Thủ Đức",
    warehouse: "WH_0001 – Kho Thủ Đức",
    packageCount: 4,
    totalWeight: 32,
    wardPhoneNumber: "028 3932 0001",
    householdPhoneNumber: "0902 345 678",
    created: "2025-03-01 09:00",
    completed: "",
    routePoints: [
      { lat: 10.8535, lng: 106.7517, label: "Kho WH_0001" },
      { lat: 10.8715, lng: 106.7879, label: "Hộ Nguyễn Thị Hoa" }
    ],
    gpsLogs: [
      { time: "09:00", address: "Kho WH_0001", speed: 0 },
      { time: "09:10", address: "Cầu vượt Linh Xuân", speed: 25 }
    ]
  }
];

let selectedCampaignListId = null;
let selectedHistoryCampaignId = null;
let map = null;
let routeLayer = null;
let markerGroup = null;
let currentStatusFilter = "ALL";

function renderMyCampaignsPage() {
  const contentArea = document.getElementById('contentArea');

  contentArea.innerHTML = `
    <div class="campaign-history-section">
      <div class="panel">
        <div class="campaigns-list-header">
          <h3>Chiến dịch của tôi</h3>
          <p style="font-size: 0.85rem; color: #6b7280; margin: 0;">Các chiến dịch đang thực hiện</p>
        </div>
        <div id="campaignHistory" class="campaign-history-list">
          <!-- JS render -->
        </div>
      </div>
    </div>

    <!-- Modal for campaign orders -->
    <div id="campaignOrdersModal" class="modal">
      <div class="modal-backdrop" onclick="closeCampaignOrders()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title" id="campaignOrdersTitle">Đơn hàng - Chiến dịch</h2>
            <button class="modal-close" onclick="closeCampaignOrders()">×</button>
          </div>
          <div id="campaignOrdersContent" class="modal-body">
            <!-- JS render order tracking -->
          </div>
        </div>
      </div>
    </div>
  `;

  renderCampaignHistory();
}

function renderCampaignsPage() {
  const contentArea = document.getElementById('contentArea');

  contentArea.innerHTML = `
    <div class="campaigns-view">
      <!-- LEFT: Campaigns Listing -->
      <div class="campaigns-list-section">
        <div class="panel">
          <div class="campaigns-list-header">
            <h3>Danh sách Chiến dịch</h3>
            <div class="campaigns-filters">
              <input
                id="campaignSearch"
                type="text"
                class="input"
                placeholder="Tìm chiến dịch..."
              />
              <div class="filter-chips">
                <button class="chip chip-active" data-status="ALL" onclick="filterCampaigns('ALL')">Tất cả</button>
                <button class="chip" data-status="Planning" onclick="filterCampaigns('Planning')">Lên kế hoạch</button>
                <button class="chip" data-status="Recruiting" onclick="filterCampaigns('Recruiting')">Tuyển TNV</button>
                <button class="chip" data-status="Delivering" onclick="filterCampaigns('Delivering')">Đang giao</button>
                <button class="chip" data-status="Closed" onclick="filterCampaigns('Closed')">Kết thúc</button>
              </div>
            </div>
          </div>
          <div id="campaignsList" class="campaigns-list">
            <!-- JS render -->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for campaign detail -->
    <div id="campaignDetailModal" class="modal">
      <div class="modal-backdrop" onclick="closeCampaignDetail()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title" id="campaignDetailTitle">Chi tiết Chiến dịch</h2>
            <button class="modal-close" onclick="closeCampaignDetail()">×</button>
          </div>
          <div id="campaignDetailContent" class="modal-body">
            <!-- JS render -->
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for campaign orders (Ahamove style) -->
    <div id="campaignOrdersModal" class="modal">
      <div class="modal-backdrop" onclick="closeCampaignOrders()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title" id="campaignOrdersTitle">Đơn hàng - Chiến dịch</h2>
            <button class="modal-close" onclick="closeCampaignOrders()">×</button>
          </div>
          <div id="campaignOrdersContent" class="modal-body">
            <!-- JS render order tracking -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Setup search
  const searchInput = document.getElementById('campaignSearch');
  if (searchInput) {
    searchInput.addEventListener('input', renderCampaignsList);
  }

  renderCampaignsList();
}

function filterCampaigns(status) {
  currentStatusFilter = status;
  
  // Update chip state
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.classList.remove('chip-active');
  });
  event.target.classList.add('chip-active');

  renderCampaignsList();
}

function renderCampaignsList() {
  const listEl = document.getElementById('campaignsList');
  const searchTerm = (document.getElementById('campaignSearch')?.value || '').toLowerCase();

  const filtered = campaigns.filter(c => {
    const matchStatus = currentStatusFilter === 'ALL' || c.status === currentStatusFilter;
    const matchSearch = !searchTerm || c.name.toLowerCase().includes(searchTerm) || c.district.toLowerCase().includes(searchTerm);
    return matchStatus && matchSearch;
  });

  listEl.innerHTML = filtered.map(c => {
    const isActive = c.id === selectedCampaignListId;
    const activeClass = isActive ? ' active' : '';
    const percent = (c.volunteersJoined / c.volunteersTarget) * 100;
    const statusMap = { 
      Planning: 'Planning',
      Recruiting: 'Recruiting',
      Delivering: 'Delivering',
      Closed: 'Closed'
    };
    const statusInfo = statusMap[c.status] || c.status;

    return `
      <div class="campaign-card${activeClass}" onclick="selectCampaignFromList('${c.id}')">
        <div style="display: flex; gap: 12px; align-items: flex-start; flex: 1;">
          <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #3b82f6, #2563eb); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.85rem; flex-shrink: 0;">
            ${c.avatar}
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
              <h4 class="campaign-card-title">${c.name}</h4>
              <span class="status-pill status-${c.status.toLowerCase()}" style="flex-shrink: 0;">${statusInfo}</span>
            </div>
            <p class="campaign-card-info">📍 ${c.district}, ${c.ward}</p>
            <p class="campaign-card-dates">🗓️ ${c.startDate} → ${c.endDate}</p>
            <div class="campaign-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${percent}%"></div>
              </div>
              <span style="font-size: 0.75rem; color: #6b7280; white-space: nowrap;">👤 ${c.volunteersJoined}/${c.volunteersTarget}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (filtered.length === 0) {
    listEl.innerHTML = '<div style="padding: 20px; text-align: center; color: #9ca3af;">Không tìm thấy chiến dịch nào</div>';
  }
}

function selectCampaignFromList(id) {
  selectedCampaignListId = id;
  renderCampaignsList();
  openCampaignDetail(id);
}

function openCampaignDetail(campaignId) {
  const campaign = campaigns.find(c => c.id === campaignId);
  if (!campaign) return;

  const contentEl = document.getElementById('campaignDetailContent');
  const percent = (campaign.volunteersJoined / campaign.volunteersTarget) * 100;
  const statusMap = { 
    Planning: 'Planning',
    Recruiting: 'Recruiting',
    Delivering: 'Delivering',
    Closed: 'Closed'
  };
  const statusText = statusMap[campaign.status] || campaign.status;
  const isJoined = volunteerCampaignHistory.some(h => h.campaignId === campaignId);

  contentEl.innerHTML = `
    <div class="campaign-detail-section">
      <h3>${campaign.name}</h3>
      <p style="color: #6b7280; margin: 0 0 16px;">ID: ${campaign.id}</p>

      <div class="detail-row">
        <div class="detail-item">
          <span class="detail-item-label">Trạng thái</span>
          <span class="status-pill status-${campaign.status.toLowerCase()}">${statusText}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Khu vực</span>
          <span class="detail-item-value">${campaign.district}</span>
        </div>
      </div>

      <div class="detail-row">
        <div class="detail-item">
          <span class="detail-item-label">Thời gian</span>
          <span class="detail-item-value">${campaign.startDate} → ${campaign.endDate}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Địa điểm</span>
          <span class="detail-item-value">${campaign.venue}</span>
        </div>
      </div>

      <div class="detail-row">
        <div class="detail-item">
          <span class="detail-item-label">TNV Tham gia</span>
          <span class="detail-item-value">${campaign.volunteersJoined}/${campaign.volunteersTarget}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item-label">Tiến độ</span>
          <div style="margin-top: 4px;">
            <div class="progress-bar" style="margin-bottom: 4px;">
              <div class="progress-fill" style="width: ${percent}%"></div>
            </div>
            <span style="font-size: 0.8rem; color: #6b7280;">${Math.round(percent)}%</span>
          </div>
        </div>
      </div>

      <div class="detail-row" style="grid-template-columns: 1fr;">
        <div class="detail-item">
          <span class="detail-item-label">Ghi chú</span>
          <span class="detail-item-value">${campaign.note}</span>
        </div>
      </div>

      ${isJoined ? `
        <div style="padding: 12px; background: #d1fae5; border-radius: 8px; color: #065f46; font-size: 0.9rem; margin-top: 16px;">
          ✓ Bạn đã tham gia chiến dịch này
        </div>
      ` : `
        <button class="btn btn-join-campaign" onclick="joinCampaign('${campaign.id}')">
          ✓ Tham gia Chiến dịch
        </button>
      `}
    </div>
  `;

  document.getElementById('campaignDetailModal').classList.add('visible');
}

function closeCampaignDetail() {
  document.getElementById('campaignDetailModal').classList.remove('visible');
}

function joinCampaign(campaignId) {
  const campaign = campaigns.find(c => c.id === campaignId);
  if (!campaign || volunteerCampaignHistory.some(h => h.campaignId === campaignId)) {
    alert('Bạn đã tham gia hoặc không thể tham gia chiến dịch này');
    return;
  }

  const newHistory = {
    id: `VCP_${Date.now()}`,
    campaignId: campaignId,
    campaignName: campaign.name,
    joinedDate: new Date().toISOString().split('T')[0],
    status: "InProgress",
    assignmentCount: 0,
    completedCount: 0,
    progressPercent: 0,
    district: campaign.district,
    ward: campaign.ward,
    venue: campaign.venue,
    avatar: campaign.avatar,
    route: campaign.route || []
  };

  volunteerCampaignHistory.unshift(newHistory);
  alert('✓ Bạn đã tham gia chiến dịch thành công!');
  closeCampaignDetail();
  renderCampaignHistory();
}

function renderCampaignHistory() {
  const historyEl = document.getElementById('campaignHistory');

  if (volunteerCampaignHistory.length === 0) {
    historyEl.innerHTML = '<div style="padding: 20px; text-align: center; color: #9ca3af;">Chưa tham gia chiến dịch nào</div>';
    return;
  }

  // Sort: InProgress first, then Completed
  const sorted = [...volunteerCampaignHistory].sort((a, b) => {
    if (a.status === 'InProgress' && b.status !== 'InProgress') return -1;
    if (a.status !== 'InProgress' && b.status === 'InProgress') return 1;
    return 0;
  });

  historyEl.innerHTML = sorted.map(h => {
    const isActive = h.id === selectedHistoryCampaignId;
    const activeClass = isActive ? ' active' : '';
    // const statusIcon = h.status === 'InProgress' ? '🔄' : '✅';
    const statusText = h.status === 'InProgress' ? 'Running' : 'Completed';
    const percent = h.assignmentCount > 0 ? (h.completedCount / h.assignmentCount) * 100 : 0;
    
    // Get orders for this campaign
    const orders = volunteerOrders.filter(o => o.campaignId === h.campaignId);
    const isExpanded = h.id === selectedHistoryCampaignId;

    return `
      <div class="history-item${activeClass}">
        <div class="history-header" onclick="toggleCampaignExpand('${h.id}')">
          <div style="display: flex; gap: 12px; align-items: flex-start; flex: 1;">
            <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.85rem; flex-shrink: 0;">
              ${h.avatar}
            </div>
            <div style="flex: 1; min-width: 0;">
              <h4 class="history-name">${h.campaignName}</h4>
              <p style="font-size: 0.8rem; color: #6b7280; margin: 2px 0 0;">📍 ${h.district}, ${h.ward}</p>
              <p style="font-size: 0.75rem; color: #9ca3af; margin: 2px 0 0;">Tham gia: ${h.joinedDate}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; flex-shrink: 0;">
            <span class="status-pill" style="font-size: 0.7rem; white-space: nowrap;"> ${statusText}</span>
            <span style="font-size: 1.2rem; color: #6b7280; transition: transform 0.2s;" id="expandIcon_${h.id}">▼</span>
          </div>
        </div>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px; color: #6b7280;">
            <span>📦 ${h.completedCount}/${h.assignmentCount} đơn</span>
            <span>📊 ${Math.round(percent)}%</span>
          </div>
          <div class="history-progress">
            <div class="history-progress-bar" style="width: ${percent}%"></div>
          </div>
        </div>
        <div id="ordersContainer_${h.id}" style="display: ${isExpanded ? 'block' : 'none'}; margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
          ${orders.length === 0 ? 
            '<div style="padding: 12px; background: #fef3c7; border-radius: 8px; color: #92400e; font-size: 0.9rem;">ℹ️ Bạn chưa được phân công đơn hàng</div>' 
            : orders.map(order => {
              const orderStatusMap = {
                Created: 'Created',
                Assigned: 'Assigned',
                Pickuped: 'Pickuped',
                Delivered: 'Delivered',
                Failed: 'Failed'
              };
              const orderStatus = orderStatusMap[order.status] || order.status;
              
              return `
                <div style="padding: 10px; background: #f9fafb; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid #3b82f6;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 0.85rem; font-weight: 500; margin-bottom: 2px;">${order.id}</div>
                      <div style="font-size: 0.8rem; color: #6b7280;">🏠 ${order.household}</div>
                    </div>
                    <div style="text-align: right;">
                      <div class="status-pill" style="font-size: 0.7rem; padding: 2px 8px; white-space: nowrap;">${orderStatus}</div>
                    </div>
                  </div>
                  <button class="btn btn-primary" style="width: 100%; margin-top: 8px; padding: 6px; font-size: 0.8rem;" onclick="openOrderDetailModal('${order.id}')">
                    Xem chi tiết & minh chứng
                  </button>
                </div>
              `;
            }).join('')
          }
        </div>
      </div>
    `;
  }).join('');
}

function toggleCampaignExpand(historyId) {
  const container = document.getElementById(`ordersContainer_${historyId}`);
  const icon = document.getElementById(`expandIcon_${historyId}`);
  
  if (container) {
    const isVisible = container.style.display !== 'none';
    container.style.display = isVisible ? 'none' : 'block';
    icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}

function openCampaignOrders(historyId) {
  const history = volunteerCampaignHistory.find(h => h.id === historyId);
  if (!history) return;

  // This function is now deprecated as orders are shown inline with expand/collapse
  selectedHistoryCampaignId = historyId;
}

function closeCampaignOrders() {
  document.getElementById('campaignOrdersModal').classList.remove('visible');
}

function openOrderDetailModal(orderId) {
  const order = volunteerOrders.find(o => o.id === orderId);
  if (!order) return;

  // Check if pickup proof has been saved (stored in sessionStorage)
  const pickupSavedKey = `pickup_saved_${orderId}`;
  const isPickupSaved = sessionStorage.getItem(pickupSavedKey) === 'true';

  const orderStatusMap = {
    Created: 'Created',
    Assigned: 'Assigned',
    Pickuped: 'Pickuped',
    Delivered: 'Delivered',
    Failed: 'Failed'
  };
  const orderStatus = orderStatusMap[order.status] || order.status;

  // Create detailed modal
  const detailModal = document.createElement('div');
  detailModal.className = 'modal visible';
  detailModal.id = 'orderDetailFullModal';
  detailModal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()">
      <div class="modal-content" onclick="event.stopPropagation()" style="max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <h2 class="modal-title">Chi tiết Đơn hàng ${order.id}</h2>
          <button class="modal-close" onclick="document.getElementById('orderDetailFullModal').remove()">×</button>
        </div>
        
        <div class="modal-body">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <div>
              <div class="detail-item">
                <span class="detail-item-label">Mã Đơn</span>
                <span class="detail-item-value">${order.id}</span>
              </div>
            </div>
            <div>
              <div class="detail-item">
                <span class="detail-item-label">Trạng thái</span>
                <div style="margin-top: 4px;">
                  <span class="status-pill">${orderStatus}</span>
                </div>
              </div>
            </div>
          </div>

          <div style="padding: 12px; background: #f0f9ff; border-radius: 8px; margin-bottom: 16px;">
            <h4 style="margin: 0 0 12px; font-size: 0.95rem;">📍 Thông tin địa điểm</h4>
            <div class="order-location-box">
              <div class="location-icon pickup">📦</div>
              <div class="location-details">
                <p class="location-title">Lấy hàng từ Kho</p>
                <p class="location-address">${order.warehouse}</p>
              </div>
            </div>
            <div style="margin: 12px 0;"></div>
            <div class="order-location-box">
              <div class="location-icon delivery">🏠</div>
              <div class="location-details">
                <p class="location-title">Giao tới Hộ gia đình</p>
                <p class="location-address">${order.household}</p>
                <p style="font-size: 0.8rem; color: #6b7280; margin: 4px 0 0;">${order.address}</p>
              </div>
            </div>
          </div>

          <div style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 16px;">
            <h4 style="margin: 0 0 12px; font-size: 0.95rem;">📦 Thông tin kiện hàng</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
              <div>
                <div class="detail-item-label">Số kiện</div>
                <div class="detail-item-value">${order.packageCount} kiện</div>
              </div>
              <div>
                <div class="detail-item-label">Trọng lượng</div>
                <div class="detail-item-value">${order.totalWeight} kg</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <div class="detail-item-label">SĐT Tổ dân phố</div>
                <div class="detail-item-value">${order.wardPhoneNumber}</div>
              </div>
              <div>
                <div class="detail-item-label">SĐT Chủ hộ</div>
                <div class="detail-item-value">${order.householdPhoneNumber}</div>
              </div>
            </div>
          </div>

          <div style="padding: 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 16px;">
            <h4 style="margin: 0 0 12px; font-size: 0.95rem;">🕐 Thời gian</h4>
            <div style="font-size: 0.9rem; color: #6b7280;">
              <div style="margin-bottom: 6px;">📝 Tạo đơn: <strong>${order.created}</strong></div>
              ${order.completed ? `<div>✅ Hoàn thành: <strong>${order.completed}</strong></div>` : '<div style="color: #b45309;">⏳ Còn đang giao...</div>'}
            </div>
          </div>

          ${!isPickupSaved ? `
            <div style="margin-bottom: 16px;">
              <h4 style="margin: 0 0 12px; font-size: 0.95rem;">📸 Minh chứng Pickup (Lấy hàng)</h4>
              <div id="pickupProofContainer" style="padding: 12px; border: 2px dashed #e5e7eb; border-radius: 8px; text-align: center; background: #f9fafb; cursor: pointer;" onclick="triggerPickupUpload()">
                <div style="font-size: 0.9rem; color: #6b7280;">
                  <div style="font-size: 1.5rem; margin-bottom: 8px;">📷</div>
                  <div>Click để tải lên ảnh minh chứng pickup</div>
                </div>
                <input type="file" id="pickupProofFile" accept="image/*" style="display: none;" onchange="previewPickupProof(event)" />
              </div>
              <div id="pickupPreview" style="margin-top: 8px;"></div>
            </div>
          ` : ''}

          ${isPickupSaved ? `
            <div style="margin-bottom: 16px;">
              <h4 style="margin: 0 0 12px; font-size: 0.95rem;">📸 Minh chứng Dropoff (Giao hàng)</h4>
              <div id="dropoffProofContainer" style="padding: 12px; border: 2px dashed #e5e7eb; border-radius: 8px; text-align: center; background: #f9fafb; cursor: pointer;" onclick="triggerDropoffUpload()">
                <div style="font-size: 0.9rem; color: #6b7280;">
                  <div style="font-size: 1.5rem; margin-bottom: 8px;">📷</div>
                  <div>Click để tải lên ảnh minh chứng dropoff</div>
                </div>
                <input type="file" id="dropoffProofFile" accept="image/*" style="display: none;" onchange="previewDropoffProof(event)" />
              </div>
              <div id="dropoffPreview" style="margin-top: 8px;"></div>
            </div>

            <div style="margin-bottom: 16px;">
              <h4 style="margin: 0 0 12px; font-size: 0.95rem;">🔲 Mã QR từ người nhận</h4>
              <div id="qrProofContainer" style="padding: 12px; border: 2px dashed #e5e7eb; border-radius: 8px; text-align: center; background: #f9fafb; cursor: pointer;" onclick="triggerQRUpload()">
                <div style="font-size: 0.9rem; color: #6b7280;">
                  <div style="font-size: 1.5rem; margin-bottom: 8px;">📷</div>
                  <div>Click để tải lên ảnh mã QR từ người nhận</div>
                </div>
                <input type="file" id="qrProofFile" accept="image/*" style="display: none;" onchange="previewQRProof(event)" />
              </div>
              <div id="qrPreview" style="margin-top: 8px;"></div>
            </div>
          ` : `
            <div style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; font-size: 0.9rem; color: #92400e;">ℹ️ <strong>Lưu minh chứng Pickup trước</strong> để có thể thêm Dropoff và Mã QR</p>
            </div>
          `}

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button class="btn btn-primary" onclick="saveOrderProofs('${order.id}')" style="padding: 10px;">💾 Lưu Minh chứng</button>
            <button class="btn btn-primary" onclick="showOrderMapFromDetail('${order.id}')" style="padding: 10px;">🗺️ Xem Bản đồ</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr; gap: 8px; margin-top: 12px;">
            <button class="btn btn-outline" onclick="document.getElementById('orderDetailFullModal').remove()" style="padding: 10px;">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(detailModal);
}

function triggerPickupUpload() {
  document.getElementById('pickupProofFile').click();
}

function triggerDropoffUpload() {
  const el = document.getElementById('dropoffProofFile');
  if (el) el.click();
}

function triggerQRUpload() {
  const el = document.getElementById('qrProofFile');
  if (el) el.click();
}

function previewPickupProof(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('pickupPreview').innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 150px; border-radius: 6px; margin-top: 8px;" />`;
    };
    reader.readAsDataURL(file);
  }
}

function previewDropoffProof(event) {
  const pickupFile = document.getElementById('pickupProofFile')?.files[0];
  if (!pickupFile) {
    alert('⚠️ Vui lòng tải lên ảnh minh chứng pickup trước');
    event.target.value = '';
    return;
  }
  
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewEl = document.getElementById('dropoffPreview');
      if (previewEl) {
        previewEl.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 150px; border-radius: 6px; margin-top: 8px;" />`;
      }
    };
    reader.readAsDataURL(file);
  }
}

function previewQRProof(event) {
  const pickupFile = document.getElementById('pickupProofFile')?.files[0];
  if (!pickupFile) {
    alert('⚠️ Vui lòng tải lên ảnh minh chứng pickup trước');
    event.target.value = '';
    return;
  }
  
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewEl = document.getElementById('qrPreview');
      if (previewEl) {
        previewEl.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 150px; border-radius: 6px; margin-top: 8px;" />`;
      }
    };
    reader.readAsDataURL(file);
  }
}

function saveOrderProofs(orderId) {
  const pickupFile = document.getElementById('pickupProofFile').files[0];
  const dropoffFile = document.getElementById('dropoffProofFile')?.files[0];
  const qrFile = document.getElementById('qrProofFile')?.files[0];

  if (!pickupFile && !dropoffFile && !qrFile) {
    alert('⚠️ Vui lòng tải lên ít nhất một minh chứng');
    return;
  }

  const pickupSavedKey = `pickup_saved_${orderId}`;
  const wasPickupAlreadySaved = sessionStorage.getItem(pickupSavedKey) === 'true';
  let shouldReopen = false;

  // Mark pickup as saved if user uploaded it
  if (pickupFile && !wasPickupAlreadySaved) {
    sessionStorage.setItem(pickupSavedKey, 'true');
    shouldReopen = true;
  }

  alert('✓ Đã lưu tất cả minh chứng cho đơn hàng ' + orderId);
  document.getElementById('orderDetailFullModal').remove();
  
  // Reopen modal to show dropoff and QR fields if pickup was just saved
  if (shouldReopen) {
    setTimeout(() => openOrderDetailModal(orderId), 100);
  }
}

function showOrderMapFromDetail(orderId) {
  const order = volunteerOrders.find(o => o.id === orderId);
  if (!order) return;

  // Create map modal
  const mapModal = document.createElement('div');
  mapModal.className = 'modal visible';
  mapModal.id = 'detailOrderMapModal';
  mapModal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">Bản đồ lộ trình - ${orderId}</h2>
          <button class="modal-close" onclick="document.getElementById('detailOrderMapModal').remove()">×</button>
        </div>
        <div id="detailOrderMap" style="width: 100%; height: 400px; border-radius: 8px; border: 1px solid #e5e7eb;"></div>
        <div style="margin-top: 12px; padding: 12px; background: #f9fafb; border-radius: 8px; font-size: 0.9rem;">
          <p style="margin: 0 0 8px;"><strong>📍 Lộ trình:</strong></p>
          <p style="margin: 0 0 4px; color: #6b7280;">📦 Điểm lấy: ${order.warehouse}</p>
          <p style="margin: 0; color: #6b7280;">🏠 Điểm giao: ${order.address}</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(mapModal);

  // Initialize map with Leaflet
  setTimeout(() => {
    const mapElement = document.getElementById('detailOrderMap');
    if (mapElement && !mapElement._leaflet_map) {
      const map = L.map(mapElement).setView([10.77, 106.7], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Add route points (if available)
      if (order.routePoints && order.routePoints.length > 0) {
        const points = order.routePoints.map(p => [p.lat, p.lng]);
        
        // Draw polyline route
        L.polyline(points, {
          color: '#facc15',
          weight: 3,
          opacity: 0.8
        }).addTo(map);

        // Add markers
        points.forEach((point, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === points.length - 1;
          const markerColor = isFirst ? 'blue' : isLast ? 'green' : 'yellow';
          const markerIcon = L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-${markerColor}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          L.marker(point, { icon: markerIcon })
            .bindPopup(`${isFirst ? 'Điểm bắt đầu' : isLast ? 'Điểm kết thúc' : 'Dừng ' + idx}`)
            .addTo(map);
        });

        // Fit bounds to show all points
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        // Default markers for pickup and delivery
        L.marker([10.77, 106.7], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).bindPopup('Điểm lấy hàng').addTo(map);

        L.marker([10.82, 106.75], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).bindPopup('Điểm giao hàng').addTo(map);
      }
    }
  }, 100);
}

function showOrderMap(orderId) {
  const order = volunteerOrders.find(o => o.id === orderId);
  if (!order) return;

  // Create map modal
  const mapModal = document.createElement('div');
  mapModal.className = 'modal visible';
  mapModal.id = 'campaignOrderMapModal';
  mapModal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">Bản đồ lộ trình - ${orderId}</h2>
          <button class="modal-close" onclick="document.getElementById('campaignOrderMapModal').remove()">×</button>
        </div>
        <div id="campaignOrderMap" style="width: 100%; height: 400px; border-radius: 8px; border: 1px solid #e5e7eb;"></div>
        <div style="margin-top: 12px; padding: 12px; background: #f9fafb; border-radius: 8px; font-size: 0.9rem;">
          <p style="margin: 0 0 8px;"><strong>📍 Lộ trình:</strong></p>
          <p style="margin: 0 0 4px; color: #6b7280;">📦 Điểm lấy: ${order.warehouse}</p>
          <p style="margin: 0; color: #6b7280;">🏠 Điểm giao: ${order.address}</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(mapModal);

  // Initialize map with Leaflet
  setTimeout(() => {
    const mapElement = document.getElementById('campaignOrderMap');
    if (mapElement && !mapElement._leaflet_map) {
      const map = L.map(mapElement).setView([10.77, 106.7], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Add route points (if available)
      if (order.routePoints && order.routePoints.length > 0) {
        const points = order.routePoints.map(p => [p.lat, p.lng]);
        
        // Draw polyline route
        L.polyline(points, {
          color: '#facc15',
          weight: 3,
          opacity: 0.8
        }).addTo(map);

        // Add markers
        points.forEach((point, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === points.length - 1;
          const markerColor = isFirst ? 'blue' : isLast ? 'green' : 'yellow';
          const markerIcon = L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-${markerColor}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          L.marker(point, { icon: markerIcon })
            .bindPopup(`${isFirst ? 'Điểm bắt đầu' : isLast ? 'Điểm kết thúc' : 'Dừng ' + idx}`)
            .addTo(map);
        });

        // Fit bounds to show all points
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [50, 50] });
      } else {
        // Default markers for pickup and delivery
        L.marker([10.77, 106.7], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).bindPopup('Điểm lấy hàng').addTo(map);

        L.marker([10.82, 106.75], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).bindPopup('Điểm giao hàng').addTo(map);
      }
    }
  }, 100);
}

function showOrderDetail(orderId) {
  const order = volunteerOrders.find(o => o.id === orderId);
  if (!order) return;
  openOrderDetailModal(orderId);
}
