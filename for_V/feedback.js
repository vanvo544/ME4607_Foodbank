// ===== FEEDBACK PAGE =====

let currentRating = 0;

function renderFeedbackPage() {
  const contentArea = document.getElementById('contentArea');

  contentArea.innerHTML = `
    <div class="feedback-view">
      <div class="panel">
        <h3 class="panel-title">Gửi Phản hồi</h3>
        
        <form id="feedbackForm" class="form">
          <div class="form-group">
            <label>Liên quan đến</label>
            <select id="feedbackType" required>
              <option value="">-- Chọn loại --</option>
              <option value="order">Đơn hàng</option>
              <option value="campaign">Chiến dịch</option>
              <option value="system">Hệ thống</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div class="form-group">
            <label>Mã tham chiếu (nếu có)</label>
            <input type="text" id="feedbackRef" placeholder="VD: #1248F9A0 hoặc CP_2025001" />
          </div>

          <div class="form-group">
            <label>Nội dung</label>
            <textarea id="feedbackContent" placeholder="Nhập ý kiến của bạn..." required></textarea>
          </div>

          <div class="form-group">
            <label>Đánh giá</label>
            <div class="rating-stars">
              <button type="button" class="star" onclick="setRating(1)">⭐</button>
              <button type="button" class="star" onclick="setRating(2)">⭐</button>
              <button type="button" class="star" onclick="setRating(3)">⭐</button>
              <button type="button" class="star" onclick="setRating(4)">⭐</button>
              <button type="button" class="star" onclick="setRating(5)">⭐</button>
            </div>
            <p id="ratingText" style="font-size: 0.9rem; color: #6b7280; margin: 8px 0 0;">Chưa đánh giá</p>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">
            Gửi Phản hồi
          </button>
        </form>
      </div>

      <div id="feedbackHistory" style="margin-top: 24px;">
        <!-- JS render history -->
      </div>
    </div>
  `;

  const form = document.getElementById('feedbackForm');
  if (form) {
    form.addEventListener('submit', handleFeedbackSubmit);
  }

  renderFeedbackHistory();
}

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll('.rating-stars .star');
  stars.forEach((s, idx) => {
    s.classList.toggle('active', idx < rating);
  });

  const texts = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Rất tốt'];
  document.getElementById('ratingText').textContent = texts[rating] || 'Chưa đánh giá';
}

function handleFeedbackSubmit(e) {
  e.preventDefault();

  const type = document.getElementById('feedbackType').value;
  const ref = document.getElementById('feedbackRef').value;
  const content = document.getElementById('feedbackContent').value;

  if (!type || !content) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  alert('✓ Phản hồi của bạn đã được gửi. Cảm ơn!');
  e.target.reset();
  currentRating = 0;
  document.getElementById('ratingText').textContent = 'Chưa đánh giá';
  renderFeedbackHistory();
}

function renderFeedbackHistory() {
  const historyEl = document.getElementById('feedbackHistory');
  
  historyEl.innerHTML = `
    <div class="panel">
      <h3 class="panel-title">Phản hồi gần đây</h3>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
            <strong>Đơn hàng #1248F9A0</strong>
            <span style="font-size: 0.8rem; color: #6b7280;">2 ngày trước</span>
          </div>
          <div style="font-size: 1.2rem; margin-bottom: 4px;">⭐⭐⭐⭐⭐</div>
          <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">"Tuyệt vời, giao hàng nhanh và chuyên nghiệp"</p>
        </div>
      </div>
    </div>
  `;
}
