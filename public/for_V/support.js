// ===== SUPPORT PAGE =====

function renderSupportPage() {
  const contentArea = document.getElementById('contentArea');

  contentArea.innerHTML = `
    <div class="support-view" style="max-width: 700px; margin: 0 auto;">
      <div class="panel">
        <h3 class="panel-title">Báo cáo Sự cố</h3>
        
        <form id="supportForm" class="form">
          <div class="form-group">
            <label>Loại sự cố</label>
            <select id="supportType" required>
              <option value="">-- Chọn loại sự cố --</option>
              <option value="delivery_failed">Giao thất bại</option>
              <option value="vehicle_broken">Hỏng xe</option>
              <option value="accident">Tai nạn / Sự cố</option>
              <option value="contact_issue">Không liên lạc được hộ</option>
              <option value="security">Vấn đề an toàn</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div class="form-group">
            <label>Mã đơn hàng / Chiến dịch</label>
            <input type="text" id="supportRef" placeholder="VD: #1248F9A0 hoặc CP_2025001" />
          </div>

          <div class="form-group">
            <label>Mức độ Ưu tiên</label>
            <div class="priority-options">
              <label class="radio-label">
                <input type="radio" name="priority" value="low" checked />
                <span>🟢 Thấp</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="priority" value="medium" />
                <span>🟡 Trung bình</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="priority" value="high" />
                <span>🔴 Cao</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>Mô tả Chi tiết</label>
            <textarea id="supportContent" placeholder="Mô tả chi tiết sự cố..." required></textarea>
          </div>

          <div class="form-group">
            <label>Đính kèm Minh chứng (nếu có)</label>
            <input type="file" id="supportProof" accept="image/*" />
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Gửi Báo cáo
          </button>
        </form>
      </div>

      <div id="supportHistory" style="margin-top: 24px;">
        <!-- JS render history -->
      </div>
    </div>
  `;

  const form = document.getElementById('supportForm');
  if (form) {
    form.addEventListener('submit', handleSupportSubmit);
  }

  renderSupportHistory();
}

function handleSupportSubmit(e) {
  e.preventDefault();

  const type = document.getElementById('supportType').value;
  const content = document.getElementById('supportContent').value;

  if (!type || !content) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  alert('✓ Báo cáo của bạn đã được gửi. Nhóm hỗ trợ sẽ liên lạc với bạn sớm!');
  e.target.reset();
  renderSupportHistory();
}

function renderSupportHistory() {
  const historyEl = document.getElementById('supportHistory');
  
  historyEl.innerHTML = `
    <div class="panel">
      <h3 class="panel-title">Báo cáo gần đây</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <div>
              <strong style="color: #111827;">Hỏng xe</strong>
              <span style="font-size: 0.75rem; margin-left: 8px; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px;">🔴 Cao</span>
            </div>
            <span style="font-size: 0.8rem; color: #6b7280;">3 ngày trước</span>
          </div>
          <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">"Xe bị hỏng phanh, đã liên lạc garage"</p>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <span style="font-size: 0.8rem; color: #059669;">✓ Đã giải quyết</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
