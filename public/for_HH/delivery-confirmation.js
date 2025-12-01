// ===== Demo data Orders cho Delivery Confirmation =====
const deliveryOrders = [
  {
    id: "#1248F9A0",
    status: "Delivered",
    volunteer: "VL_9100888888 – Trần Mai Hương",
    packageCount: 5,
    totalWeight: 45,
    eta: "2025-03-01 08:05",
    qrCode: "#1248F9A0-QR-CODE",
  },
  {
    id: "#25ACDB12",
    status: "InTransit",
    volunteer: "VL_9100505678 – Nguyễn Văn An",
    packageCount: 4,
    totalWeight: 32,
    eta: "2025-03-01 10:45",
    qrCode: "#25ACDB12-QR-CODE",
  },
  {
    id: "#9980F145",
    status: "Upcoming",
    volunteer: "Chưa gán",
    packageCount: 3,
    totalWeight: 25,
    eta: "2025-03-01 15:00",
    qrCode: "#9980F145-QR-CODE",
  },
];

// ===== Render Delivery Confirmation Page =====
function renderDeliveryPage() {
  const contentArea = document.getElementById("contentArea");

  const undelivered = deliveryOrders.filter(
    (o) => o.status !== "Delivered"
  );
  const delivered = deliveryOrders.filter(
    (o) => o.status === "Delivered"
  );

  contentArea.innerHTML = `
    <div style="display: grid; gap: 20px;">
      <!-- Đã giao -->
      <div class="panel">
        <h2 class="panel-title">✓ Đã nhận hàng (${delivered.length})</h2>
        ${
          delivered.length === 0
            ? `<p style="margin: 0; color: #6b7280; text-align: center; padding: 20px;">Chưa có đơn hàng nào đã được xác nhận.</p>`
            : `
            <div class="table-wrapper">
              <table class="table">
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Tình Nguyện Viên</th>
                    <th>Số Kiện</th>
                    <th>Trọng Lượng</th>
                    <th>Thời Gian Xác Nhận</th>
                  </tr>
                </thead>
                <tbody>
                  ${delivered
                    .map(
                      (order) => `
                    <tr>
                      <td>${order.id}</td>
                      <td>${order.volunteer}</td>
                      <td>${order.packageCount}</td>
                      <td>${order.totalWeight} kg</td>
                      <td>${order.eta}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `
        }
      </div>

      <!-- Chưa giao -->
      <div class="panel">
        <h2 class="panel-title">📦 Chưa nhận hàng (${undelivered.length})</h2>
        ${
          undelivered.length === 0
            ? `<p style="margin: 0; color: #6b7280; text-align: center; padding: 20px;">Tất cả đơn hàng đã được giao.</p>`
            : `
            <div style="display: grid; gap: 12px;">
              ${undelivered
                .map(
                  (order) => `
                <div style="
                  padding: 12px;
                  background: #f9fafb;
                  border-radius: 8px;
                  border: 1px solid #e5e7eb;
                  cursor: pointer;
                  transition: all 0.15s;
                "
                onmouseover="this.style.boxShadow='0 2px 8px rgba(15, 23, 42, 0.1)'"
                onmouseout="this.style.boxShadow='none'"
                onclick="openQRModal('${order.id}')">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
                    <div>
                      <p style="margin: 0 0 4px; font-size: 0.75rem; color: #9ca3af; text-transform: uppercase;">Mã Đơn</p>
                      <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">${order.id}</p>
                    </div>
                    <div>
                      <p style="margin: 0 0 4px; font-size: 0.75rem; color: #9ca3af; text-transform: uppercase;">Tình Nguyện Viên</p>
                      <p style="margin: 0; font-size: 0.9rem;">${order.volunteer}</p>
                    </div>
                    <div>
                      <p style="margin: 0 0 4px; font-size: 0.75rem; color: #9ca3af; text-transform: uppercase;">Số Kiện</p>
                      <p style="margin: 0; font-size: 0.9rem;">${order.packageCount}</p>
                    </div>
                    <div>
                      <p style="margin: 0 0 4px; font-size: 0.75rem; color: #9ca3af; text-transform: uppercase;">Trọng Lượng</p>
                      <p style="margin: 0; font-size: 0.9rem;">${order.totalWeight} kg</p>
                    </div>
                  </div>
                  <button class="btn btn-primary" onclick="event.stopPropagation(); openQRModal('${order.id}')" style="width: 100%;">
                    Quét QR để xác nhận
                  </button>
                </div>
              `
                )
                .join("")}
            </div>
          `
        }
      </div>
    </div>

    <!-- QR Modal -->
    <div id="qrModal" class="modal">
      <div class="modal-backdrop" id="qrBackdrop" onclick="closeQRModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">Xác Nhận Giao Hàng</h2>
            <button class="modal-close" onclick="closeQRModal()">×</button>
          </div>
          
          <div id="qrModalBody">
            <!-- QR code sẽ được render ở đây -->
          </div>
        </div>
      </div>
    </div>
  `;

  setupDeliveryListeners();
}

function openQRModal(orderId) {
  const order = deliveryOrders.find((o) => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("qrModal");
  const body = document.getElementById("qrModalBody");

  body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px; font-size: 0.85rem; color: #6b7280;">
          <strong>Mã Đơn:</strong> ${order.id}
        </p>
        <p style="margin: 0 0 8px; font-size: 0.85rem; color: #6b7280;">
          <strong>Tình Nguyện Viên:</strong> ${order.volunteer}
        </p>
        <p style="margin: 0 0 16px; font-size: 0.85rem; color: #6b7280;">
          <strong>Số Kiện:</strong> ${order.packageCount} | <strong>Trọng Lượng:</strong> ${order.totalWeight} kg
        </p>
      </div>

      <div class="qr-container">
        <div id="qrCodeContainer" style="width: 240px; height: 240px;"></div>
        <p class="qr-text">
          Sử dụng camera hoặc ứng dụng quét QR code để xác nhận nhận hàng
        </p>
      </div>

      <div style="background: #fffbeb; padding: 12px; border-radius: 8px; border-left: 3px solid #facc15;">
        <p style="margin: 0; font-size: 0.85rem; color: #8b5900;">
          📱 <strong>Hướng dẫn:</strong> Mở ứng dụng quét mã QR trên điện thoại, chụp mã phía dưới. 
          Khi quét thành công, bạn sẽ nhận được xác nhận giao hàng.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <button class="btn btn-outline" onclick="closeQRModal()">Hủy</button>
        <button class="btn btn-success" onclick="confirmDelivery('${order.id}')">
          ✓ Đã quét & Xác nhận
        </button>
      </div>
    </div>
  `;

  // Generate QR code
  setTimeout(() => {
    const container = document.getElementById("qrCodeContainer");
    container.innerHTML = "";
    new QRCode(container, {
      text: order.qrCode,
      width: 240,
      height: 240,
      colorDark: "#111827",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }, 0);

  modal.classList.add("visible");
}

function closeQRModal() {
  document.getElementById("qrModal").classList.remove("visible");
}

function confirmDelivery(orderId) {
  const order = deliveryOrders.find((o) => o.id === orderId);
  if (!order) return;

  // Update status
  order.status = "Delivered";

  // Show success message
  alert(`✓ Đã xác nhận nhận hàng ${order.id}!\n\nCảm ơn bạn đã sử dụng dịch vụ của chúng tôi.`);

  // Close modal and refresh
  closeQRModal();
  renderDeliveryPage();
}

function setupDeliveryListeners() {
  // Listeners already set up via onclick attributes
}
