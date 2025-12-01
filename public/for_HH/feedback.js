// ===== Demo data Feedbacks =====
const submittedFeedbacks = [];

// ===== Render Feedback Page =====
function renderFeedbackPage() {
  const contentArea = document.getElementById("contentArea");

  contentArea.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <!-- Form phản hồi -->
      <div class="panel">
        <h2 class="panel-title">📝 Gửi Phản Hồi</h2>
        <p class="panel-subtitle">Chia sẻ ý kiến của bạn về dịch vụ của chúng tôi</p>

        <form id="feedbackForm" onsubmit="submitFeedback(event)" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="form-group">
            <label>Tiêu Đề *</label>
            <input 
              type="text" 
              id="feedbackTitle" 
              placeholder="Vd: Dịch vụ giao hàng rất tốt" 
              required
            />
          </div>

          <div class="form-group">
            <label>Loại Phản Hồi *</label>
            <select id="feedbackType" required style="width: 100%; padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 0.9rem;">
              <option value="">-- Chọn loại phản hồi --</option>
              <option value="Positive">👍 Tích cực - Cảm ơn</option>
              <option value="Suggestion">💡 Góp ý - Cải thiện</option>
              <option value="Problem">⚠️ Vấn đề - Báo cáo sự cố</option>
              <option value="Other">📌 Khác</option>
            </select>
          </div>

          <div class="form-group">
            <label>Nội Dung Phản Hồi *</label>
            <textarea 
              id="feedbackContent" 
              placeholder="Vui lòng chi tiết mô tả phản hồi của bạn..."
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label>Tệp Đính Kèm (Không bắt buộc)</label>
            <input 
              type="file" 
              id="feedbackFile"
              accept="image/*,.pdf,.doc,.docx"
              style="padding: 8px;"
            />
            <p style="margin: 4px 0 0; font-size: 0.8rem; color: #9ca3af;">
              Hỗ trợ: Ảnh, PDF, DOC (Tối đa 5MB)
            </p>
          </div>

          <div class="form-group">
            <label style="display: flex; gap: 8px; align-items: center; cursor: pointer;">
              <input type="checkbox" id="feedbackConsent" required />
              <span style="font-size: 0.9rem;">Tôi đồng ý chia sẻ phản hồi này để cải thiện dịch vụ</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px;">
            ✓ Gửi Phản Hồi
          </button>
        </form>
      </div>

      <!-- Lịch sử phản hồi -->
      <div class="panel">
        <h2 class="panel-title">📋 Lịch Sử Phản Hồi</h2>
        <p class="panel-subtitle">Các phản hồi bạn đã gửi trước đây</p>

        <div id="feedbackHistory" style="display: flex; flex-direction: column; gap: 12px; max-height: 600px; overflow-y: auto;">
          ${
            submittedFeedbacks.length === 0
              ? `
            <div style="
              padding: 40px 20px;
              text-align: center;
              color: #9ca3af;
              background: #f9fafb;
              border-radius: 8px;
            ">
              <p style="margin: 0; font-size: 0.9rem;">
                Chưa có phản hồi nào được gửi.
              </p>
              <p style="margin: 4px 0 0; font-size: 0.8rem;">
                Hãy chia sẻ ý kiến của bạn bên trái!
              </p>
            </div>
          `
              : `${submittedFeedbacks
                  .map(
                    (fb, idx) => `
            <div style="
              padding: 12px;
              background: #f9fafb;
              border-radius: 8px;
              border-left: 3px solid ${
                fb.type === "Positive"
                  ? "#22c55e"
                  : fb.type === "Suggestion"
                  ? "#3b82f6"
                  : "#ef4444"
              };
            ">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
                <div>
                  <p style="margin: 0 0 4px; font-weight: 600; font-size: 0.9rem;">
                    ${fb.title}
                  </p>
                  <p style="margin: 0; font-size: 0.8rem; color: #6b7280;">
                    ${fb.type === "Positive"
                      ? "👍 Tích cực"
                      : fb.type === "Suggestion"
                      ? "💡 Góp ý"
                      : "⚠️ Vấn đề"}
                  </p>
                </div>
                <span style="font-size: 0.75rem; color: #9ca3af;">${fb.date}</span>
              </div>
              <p style="margin: 8px 0 0; font-size: 0.85rem; color: #4b5563; line-height: 1.5;">
                ${fb.content.substring(0, 100)}${fb.content.length > 100 ? "..." : ""}
              </p>
            </div>
          `
                  )
                  .join("")}`
          }
        </div>
      </div>
    </div>

    <!-- Modal xác nhận -->
    <div id="confirmFeedbackModal" class="modal">
      <div class="modal-backdrop" id="confirmBackdrop" onclick="closeConfirmModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title">✓ Gửi Thành Công</h2>
            <button class="modal-close" onclick="closeConfirmModal()">×</button>
          </div>
          
          <div id="confirmModalBody">
            <!-- Thông báo sẽ được render ở đây -->
          </div>
        </div>
      </div>
    </div>
  `;

  setupFeedbackForm();
}

function submitFeedback(event) {
  event.preventDefault();

  const title = document.getElementById("feedbackTitle").value.trim();
  const type = document.getElementById("feedbackType").value;
  const content = document.getElementById("feedbackContent").value.trim();
  const fileInput = document.getElementById("feedbackFile");
  const consent = document.getElementById("feedbackConsent").checked;

  if (!title || !type || !content || !consent) {
    alert("Vui lòng điền đầy đủ thông tin và đồng ý điều khoản.");
    return;
  }

  // Create feedback object
  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${now.getFullYear()} ${String(now.getHours()).padStart(
    2,
    "0"
  )}:${String(now.getMinutes()).padStart(2, "0")}`;

  const feedback = {
    id: `FB_${Date.now()}`,
    title,
    type,
    content,
    file: fileInput.files[0]
      ? fileInput.files[0].name
      : null,
    date: dateStr,
  };

  // Add to history
  submittedFeedbacks.unshift(feedback);

  // Show confirmation
  showFeedbackConfirmation(feedback);

  // Reset form
  document.getElementById("feedbackForm").reset();
}

function showFeedbackConfirmation(feedback) {
  const modal = document.getElementById("confirmFeedbackModal");
  const body = document.getElementById("confirmModalBody");

  const typeText = {
    Positive: "👍 Tích cực - Cảm ơn",
    Suggestion: "💡 Góp ý - Cải thiện",
    Problem: "⚠️ Vấn đề - Báo cáo sự cố",
    Other: "📌 Khác",
  };

  body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="background: #dcfce7; padding: 16px; border-radius: 8px; border-left: 3px solid #15803d;">
        <p style="margin: 0; font-size: 0.9rem; color: #15803d; font-weight: 600;">
          ✓ Phản hồi của bạn đã được gửi thành công!
        </p>
      </div>

      <div>
        <p style="margin: 0 0 8px; font-size: 0.85rem; color: #6b7280; text-transform: uppercase; font-weight: 600;">Thông tin phản hồi</p>
        <div style="background: #f9fafb; padding: 12px; border-radius: 8px; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
          <div style="display: flex; gap: 12px;">
            <span style="min-width: 80px; color: #6b7280;">Tiêu đề:</span>
            <span style="font-weight: 600;">${feedback.title}</span>
          </div>
          <div style="display: flex; gap: 12px;">
            <span style="min-width: 80px; color: #6b7280;">Loại:</span>
            <span>${typeText[feedback.type] || feedback.type}</span>
          </div>
          <div style="display: flex; gap: 12px;">
            <span style="min-width: 80px; color: #6b7280;">Thời gian:</span>
            <span>${feedback.date}</span>
          </div>
          ${
            feedback.file
              ? `
            <div style="display: flex; gap: 12px;">
              <span style="min-width: 80px; color: #6b7280;">Tệp:</span>
              <span>${feedback.file}</span>
            </div>
          `
              : ""
          }
        </div>
      </div>

      <div style="background: #fffbeb; padding: 12px; border-radius: 8px; border-left: 3px solid #facc15;">
        <p style="margin: 0; font-size: 0.85rem; color: #8b5900;">
          💬 <strong>Cảm ơn bạn!</strong> Phản hồi của bạn rất quý giá và sẽ giúp chúng tôi cải thiện dịch vụ.
        </p>
      </div>

      <button class="btn btn-primary" onclick="closeConfirmModal()" style="width: 100%; padding: 12px;">
        ✓ Đóng
      </button>
    </div>
  `;

  modal.classList.add("visible");
}

function closeConfirmModal() {
  document.getElementById("confirmFeedbackModal").classList.remove("visible");
  renderFeedbackPage();
}

function setupFeedbackForm() {
  // Form listeners already set via onsubmit
}
