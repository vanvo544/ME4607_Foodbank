// ===== Demo data Survey List =====
const demoSurveys = [
  {
    surveyId: "SV_001",
    householdId: "HH_9100402000",
    householdName: "Hộ Trần Văn Hùng",
    leader: "Lê Văn B – Tổ trưởng Tổ 3, P. 1, Q.4",
    surveyDate: "2025-03-01 14:30",
    month: "03/2025",
    householder: "Trần Văn Hùng",
    totalMembers: 5,
    childrenCount: 1,
    elderlyCount: 1,
    vulnerabilityType: "Lao động thu nhập thấp / Người già",
    monthlyIncome: "4.500.000 VND",
    livingCondition: "Nhà tạm/Phòng trọ không đủ điều kiện",
    specialNeeds: "Hỗ trợ thực phẩm, dụng cụ sinh hoạt",
    notes: "Hộ có người bị bệnh mãn tính, cần hỗ trợ thuốc định kỳ",
    status: "Hoàn thành",
  },
  {
    surveyId: "SV_002",
    householdId: "HH_9100402000",
    householdName: "Hộ Trần Văn Hùng",
    leader: "Lê Văn B – Tổ trưởng Tổ 3, P. 1, Q.4",
    surveyDate: "2024-12-15 10:20",
    month: "12/2024",
    householder: "Trần Văn Hùng",
    totalMembers: 5,
    childrenCount: 1,
    elderlyCount: 1,
    vulnerabilityType: "Lao động thu nhập thấp",
    monthlyIncome: "4.200.000 VND",
    livingCondition: "Nhà tạm/Phòng trọ không đủ điều kiện",
    specialNeeds: "Hỗ trợ thực phẩm",
    notes: "Tình hình kinh tế hơi cải thiện so với tháng 10",
    status: "Hoàn thành",
  },
  {
    surveyId: "SV_003",
    householdId: "HH_9100402000",
    householdName: "Hộ Trần Văn Hùng",
    leader: "Ngô Thị Hoa – Tổ trưởng Tổ 3, P. 1, Q.4",
    surveyDate: "2024-09-10 14:00",
    month: "09/2024",
    householder: "Trần Văn Hùng",
    totalMembers: 5,
    childrenCount: 2,
    elderlyCount: 1,
    vulnerabilityType: "Lao động thu nhập thấp / Trẻ em",
    monthlyIncome: "3.800.000 VND",
    livingCondition: "Nhà tạm/Phòng trọ",
    specialNeeds: "Hỗ trợ thực phẩm, sách vở cho trẻ",
    notes: "Có con em bị bệnh, chi phí y tế cao",
    status: "Hoàn thành",
  },
];

// ===== Render Survey Page =====
function renderSurveyPage() {
  const contentArea = document.getElementById("contentArea");

  contentArea.innerHTML = `
    <div class="panel">
      <h2 class="panel-title">📋 Danh Sách Khảo Sát</h2>
      <p class="panel-subtitle">Xem lịch sử khảo sát của hộ (${demoSurveys.length} kết quả)</p>
      
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Mã Khảo Sát</th>
              <th>Tháng/Năm</th>
              <th>Tổ Trưởng</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody id="surveyTableBody">
            <!-- JS render danh sách -->
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal chi tiết khảo sát -->
    <div id="surveyDetailModal" class="modal">
      <div class="modal-backdrop" id="surveyDetailBackdrop" onclick="closeSurveyDetail()">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h2 class="modal-title" id="surveyDetailTitle">Chi tiết khảo sát</h2>
            <button class="modal-close" id="surveyDetailClose" onclick="closeSurveyDetail()">×</button>
          </div>
          
          <div id="surveyDetailBody">
            <!-- Chi tiết sẽ được render ở đây -->
          </div>
        </div>
      </div>
    </div>
  `;

  renderSurveyList();
}

function renderSurveyList() {
  const tbody = document.getElementById("surveyTableBody");
  tbody.innerHTML = "";

  demoSurveys.forEach((survey) => {
    const statusClass = survey.status === "Hoàn thành" ? "status-Delivered" : "status-InTransit";
    
    const row = `
      <tr>
        <td>
          <button class="order-id" onclick="openSurveyDetail('${survey.surveyId}')" style="background: none; border: none; color: #000000ff; cursor: pointer; font-size: 0.9rem; font-weight: 600; padding: 0;">
            ${survey.surveyId}
          </button>
        </td>
        <td>${survey.month}</td>
        <td>${survey.leader}</td>
        <td>
          <span class="status-pill ${statusClass}" style="font-size: 0.75rem;">✓ ${survey.status}</span>
        </td>
        <td>
          <button class="btn btn-outline" onclick="openSurveyDetail('${survey.surveyId}')" style="padding: 4px 8px; font-size: 0.8rem;">
            Xem
          </button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function openSurveyDetail(surveyId) {
  const survey = demoSurveys.find((s) => s.surveyId === surveyId);
  if (!survey) return;

  const modal = document.getElementById("surveyDetailModal");
  const title = document.getElementById("surveyDetailTitle");
  const body = document.getElementById("surveyDetailBody");

  title.textContent = `Chi tiết khảo sát – ${survey.surveyId}`;

  body.innerHTML = `
    <div style="display: grid; gap: 16px;">
      <div>
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280; text-transform: uppercase; font-weight: 600;">Thông Tin Khảo Sát</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Mã Khảo Sát</div>
            <div class="info-value">${survey.surveyId}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Mã Tài Khoản HH</div>
            <div class="info-value">${survey.householdId}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Thời Điểm Khảo Sát</div>
            <div class="info-value">${survey.surveyDate}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Tổ Trưởng Mở Khảo Sát</div>
            <div class="info-value" style="font-size: 0.85rem;">${survey.leader}</div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280; text-transform: uppercase; font-weight: 600;">Thông Tin Hộ</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Chủ Hộ Khẩu</div>
            <div class="info-value">${survey.householder}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Số Thành Viên Trong Hộ</div>
            <div class="info-value">${survey.totalMembers} người</div>
          </div>
          <div class="info-item">
            <div class="info-label">Số Trẻ Em (≤ 12 tuổi)</div>
            <div class="info-value">${survey.childrenCount} người</div>
          </div>
          <div class="info-item">
            <div class="info-label">Số Người Già (≥ 60 tuổi)</div>
            <div class="info-value">${survey.elderlyCount} người</div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280; text-transform: uppercase; font-weight: 600;">Tình Trạng Tổn Thương</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Kiểu Tổn Thương</div>
            <div class="info-value" style="font-size: 0.85rem;">${survey.vulnerabilityType}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Thu Nhập Hàng Tháng</div>
            <div class="info-value">${survey.monthlyIncome}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Điều Kiện Sống</div>
            <div class="info-value" style="font-size: 0.85rem;">${survey.livingCondition}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Nhu Cầu Đặc Biệt</div>
            <div class="info-value" style="font-size: 0.85rem;">${survey.specialNeeds}</div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280; text-transform: uppercase; font-weight: 600;">Ghi Chú</h3>
        <p style="margin: 0; color: #4b5563; line-height: 1.6; background: #f9fafb; padding: 12px; border-radius: 8px;">
          ${survey.notes}
        </p>
      </div>

      <div style="display: flex; gap: 8px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
        <button class="btn btn-outline" onclick="closeSurveyDetail()" style="flex: 1;">Đóng</button>
      </div>
    </div>
  `;

  modal.classList.add("visible");
}

function closeSurveyDetail() {
  document.getElementById("surveyDetailModal").classList.remove("visible");
}
