// ===== ORDERS PAGE =====

function renderOrdersPage() {
  const contentArea = document.getElementById('contentArea');

  contentArea.innerHTML = `
    <div class="orders-view">
      <div class="orders-filters">
        <input
          id="orderSearch"
          type="text"
          class="input"
          placeholder="Tìm mã đơn hàng..."
        />
        <select id="orderStatus" class="input">
          <option value="">-- Tất cả trạng thái --</option>
          <option value="Upcoming">Sắp giao</option>
          <option value="InTransit">Đang giao</option>
          <option value="Delivered">Đã giao</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Mã Đơn</th>
              <th>Trạng Thái</th>
              <th>Hộ Gia Đình</th>
              <th>Kho</th>
              <th>Kiện</th>
              <th>Ngày Tạo</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody id="orderTableBody">
            <!-- JS render -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order detail modal -->
    <div id="orderDetailModal" class="modal">
      <div class="modal-backdrop" onclick="closeOrderDetail()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title" id="orderDetailTitle">Chi tiết Đơn hàng</h2>
            <button class="modal-close" onclick="closeOrderDetail()">×</button>
          </div>
          <div id="orderDetailContent" class="modal-body">
            <!-- JS render -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Setup event listeners
  const searchInput = document.getElementById('orderSearch');
  const statusFilter = document.getElementById('orderStatus');

  if (searchInput) searchInput.addEventListener('input', renderOrdersList);
  if (statusFilter) statusFilter.addEventListener('change', renderOrdersList);

  renderOrdersList();
}

function renderOrdersList() {
  const tbody = document.getElementById('orderTableBody');
  const searchTerm = (document.getElementById('orderSearch')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('orderStatus')?.value || '';

  const filtered = volunteerOrders.filter(order => {
    const matchSearch = !searchTerm || order.id.toLowerCase().includes(searchTerm) || order.household.toLowerCase().includes(searchTerm);
    const matchStatus = !statusFilter || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  tbody.innerHTML = filtered.map(order => {
    const statusClass = `status-${order.status.toLowerCase()}`;
    const statusText = { Delivered: 'Đã giao', InTransit: 'Đang giao', Upcoming: 'Sắp giao' }[order.status];

    return `
      <tr>
        <td><strong>${order.id}</strong></td>
        <td><span class="status-pill ${statusClass}">${statusText}</span></td>
        <td>${order.household}</td>
        <td>${order.warehouse}</td>
        <td>${order.packageCount}</td>
        <td>${order.created}</td>
        <td>
          <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="openOrderDetail('${order.id}')">
            Xem
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openOrderDetail(orderId) {
  const order = volunteerOrders.find(o => o.id === orderId);
  if (!order) return;

  const contentEl = document.getElementById('orderDetailContent');
  const titleEl = document.getElementById('orderDetailTitle');
  const statusClass = `status-${order.status.toLowerCase()}`;
  const statusText = { Delivered: 'Đã giao', InTransit: 'Đang giao', Upcoming: 'Sắp giao' }[order.status];

  titleEl.textContent = `Chi tiết ${order.id}`;

  // Build timeline
  const timelineHTML = `
    <div class="order-timeline">
      <div class="timeline-item">
        <div class="timeline-dot completed"></div>
        <div class="timeline-content">
          <div class="timeline-time">${order.created}</div>
          <div class="timeline-status">Tạo đơn</div>
        </div>
      </div>
      ${order.status !== 'Upcoming' ? `
        <div class="timeline-item">
          <div class="timeline-dot ${order.status === 'Delivered' ? 'completed' : 'pending'}"></div>
          <div class="timeline-content">
            <div class="timeline-time">${order.completed || 'Đang giao...'}</div>
            <div class="timeline-status">${order.status === 'Delivered' ? 'Giao xong' : 'Đang giao'}</div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  contentEl.innerHTML = `
    <div class="order-tracking-panel">
      <div class="tracking-info-row">
        <div>
          <div class="tracking-info-label">Mã Đơn</div>
          <div class="tracking-info-value">${order.id}</div>
        </div>
        <div>
          <span class="status-pill ${statusClass}">${statusText}</span>
        </div>
      </div>

      <div style="margin-top: 12px;">
        <div class="order-location-box">
          <div class="location-icon pickup">📦</div>
          <div class="location-details">
            <p class="location-title">Lấy từ Kho</p>
            <p class="location-address">${order.warehouse}</p>
          </div>
        </div>
        <div style="margin: 8px 0;"></div>
        <div class="order-location-box">
          <div class="location-icon delivery">🏠</div>
          <div class="location-details">
            <p class="location-title">Giao tới</p>
            <p class="location-address">${order.household}</p>
            <p style="font-size: 0.8rem; color: #6b7280; margin: 4px 0 0;">${order.address}</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 16px; padding: 12px; background: #f9fafb; border-radius: 8px;">
        <div style="font-size: 0.85rem; color: #6b7280;">
          <div>📦 <strong>${order.packageCount}</strong> kiện hàng</div>
          <div style="margin-top: 4px;">⚖️ <strong>${order.totalWeight}</strong> kg</div>
        </div>
      </div>

      <div style="margin-top: 16px;">
        <h4 style="margin: 0 0 12px; font-size: 0.95rem; color: #111827;">Timeline</h4>
        ${timelineHTML}
      </div>

      <div class="tracking-buttons" style="margin-top: 16px;">
        <button class="btn btn-primary" onclick="closeOrderDetail(); showOrderMapModal('${order.id}')">🗺️ Bản đồ</button>
        <button class="btn btn-primary" onclick="showProofUpload('${order.id}')">📸 Minh chứng</button>
      </div>
    </div>
  `;

  document.getElementById('orderDetailModal').classList.add('visible');
}

function closeOrderDetail() {
  document.getElementById('orderDetailModal').classList.remove('visible');
}

function showOrderMapModal(orderId) {
  const order = volunteerOrders.find(o => o.id === orderId);
  if (!order) return;

  // Create map modal
  const mapModal = document.createElement('div');
  mapModal.className = 'modal visible';
  mapModal.id = 'orderMapModal';
  mapModal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">Bản đồ lộ trình - ${orderId}</h2>
          <button class="modal-close" onclick="document.getElementById('orderMapModal').remove()">×</button>
        </div>
        <div id="orderMap" style="width: 100%; height: 400px; border-radius: 8px; border: 1px solid #e5e7eb;"></div>
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
    const mapElement = document.getElementById('orderMap');
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

function showProofUpload(orderId) {
  const order = volunteerOrders.find(o => o.id === orderId);
  if (!order) return;

  // Create proof upload modal
  const proofModal = document.createElement('div');
  proofModal.className = 'modal visible';
  proofModal.id = 'proofUploadModal';
  proofModal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">Đính kèm Minh chứng - ${orderId}</h2>
          <button class="modal-close" onclick="document.getElementById('proofUploadModal').remove()">×</button>
        </div>
        <div class="form-group">
          <label>📸 Chọn ảnh minh chứng</label>
          <input type="file" id="proofFile" accept="image/*" class="input" />
        </div>
        <div id="previewContainer" style="margin-top: 12px; text-align: center;"></div>
        <div style="display: flex; gap: 8px; margin-top: 16px;">
          <button class="btn btn-primary" onclick="uploadProof('${orderId}')" style="flex: 1;">Upload</button>
          <button class="btn btn-outline" onclick="document.getElementById('proofUploadModal').remove()" style="flex: 1;">Hủy</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(proofModal);

  // Setup file preview
  const fileInput = document.getElementById('proofFile');
  const previewContainer = document.getElementById('previewContainer');

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previewContainer.innerHTML = `<img src="${event.target.result}" style="max-width: 100%; max-height: 300px; border-radius: 8px;" />`;
      };
      reader.readAsDataURL(file);
    }
  });
}

function uploadProof(orderId) {
  const fileInput = document.getElementById('proofFile');
  if (fileInput.files.length === 0) {
    alert('Vui lòng chọn ảnh');
    return;
  }
  alert('✓ Đã upload minh chứng cho ' + orderId);
  document.getElementById('proofUploadModal').remove();
}
