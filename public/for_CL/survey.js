// ===== Storage keys cho Community Leader =====
const CL_HOUSEHOLDS_KEY = "cl_households";
const CL_SURVEYS_KEY = "cl_surveys";

// ===== Demo households mặc định =====
const defaultHouseholds = [
  {
    id: "HH_9100402000",
    name: "Hộ Trần Văn Hùng",
    phone: "0928956342",
    address: "P.8, Quận 4, TP.HCM",
    vulnerability: "Lao động thu nhập thấp / Người già",
  },
  {
    id: "HH_9100501001",
    name: "Hộ Nguyễn Thị Lan",
    phone: "0928000001",
    address: "P.1, Quận 4, TP.HCM",
    vulnerability: "Lao động thu nhập thấp",
  },
  {
    id: "HH_9100602002",
    name: "Hộ Lê Văn C",
    phone: "0928000002",
    address: "P.3, Quận 4, TP.HCM",
    vulnerability: "Trẻ em / Nhà trọ tạm bợ",
  },
];

function loadHouseholds() {
  try {
    const raw = localStorage.getItem(CL_HOUSEHOLDS_KEY);
    if (!raw) return defaultHouseholds.slice();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) return defaultHouseholds.slice();
    return arr;
  } catch (e) {
    return defaultHouseholds.slice();
  }
}

let surveyHouseholds = loadHouseholds();

function saveHouseholds() {
  localStorage.setItem(CL_HOUSEHOLDS_KEY, JSON.stringify(surveyHouseholds));
}

// ===== Demo surveys mặc định =====
const defaultSurveys = [
  {
    surveyId: "SV_001",
    householdId: "HH_9100402000",
    householdName: "Hộ Trần Văn Hùng",
    leader: "Lê Văn B – Tổ trưởng Tổ 3, P. 1, Q.4",
    month: "03/2025",
    surveyDate: "2025-03-01 14:30",
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
    householdId: "HH_9100501001", 
    householdName: "Hộ Nguyễn Thị Lan",
    leader: "Ngô Thị Hoa – Tổ trưởng Tổ 1, P. 1, Q.4",
    month: "02/2025",
    surveyDate: "2025-02-15 10:15",
    householder: "Nguyễn Thị Lan",
    totalMembers: 4,
    childrenCount: 2,
    elderlyCount: 0,
    vulnerabilityType: "Trẻ em / Thu nhập thấp",
    monthlyIncome: "3.800.000 VND",
    livingCondition: "Nhà tạm/Phòng trọ",
    specialNeeds: "Hỗ trợ thực phẩm, sách vở cho trẻ",
    notes: "Cần hỗ trợ gạo và sữa cho trẻ",
    status: "Hoàn thành",
  },
];

function loadSurveys() {
  try {
    const raw = localStorage.getItem(CL_SURVEYS_KEY);
    if (!raw) return defaultSurveys.slice();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) return defaultSurveys.slice();
    return arr;
  } catch (e) {
    return defaultSurveys.slice();
  }
}

let clSurveys = loadSurveys();

function saveSurveys() {
  localStorage.setItem(CL_SURVEYS_KEY, JSON.stringify(clSurveys));
}

// ===== Trang: Khảo sát nhu cầu (render vào index.html#contentArea) =====
function renderSurveyPage() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `
    <div class="panel">
      <h2 class="panel-title">📋 Điền khảo sát nhu cầu</h2>
      <p class="panel-subtitle">
        Community Leader thực hiện khảo sát hàng tháng cho từng hộ yếu thế trong khu vực.
      </p>

      <form id="clSurveyForm">
        <div class="input-group">
          <label>Chọn hộ gia đình *</label>
          <select id="surveyHouseholdId" class="input" required>
            <option value="">-- Chọn hộ yếu thế --</option>
          </select>
        </div>

        <div class="info-grid">
          <div class="input-group">
            <label>Chủ hộ khẩu</label>
            <input id="surveyHouseholder" class="input" placeholder="Tên chủ hộ" />
          </div>
          <div class="input-group">
            <label>Tổng số thành viên *</label>
            <input id="surveyTotalMembers" type="number" min="1" class="input" required />
          </div>
          <div class="input-group">
            <label>Số trẻ em (≤ 12 tuổi) *</label>
            <input id="surveyChildren" type="number" min="0" class="input" required />
          </div>
          <div class="input-group">
            <label>Số người già (≥ 60 tuổi) *</label>
            <input id="surveyElderly" type="number" min="0" class="input" required />
          </div>
        </div>

        <div class="info-grid">
          <div class="input-group">
            <label>Kiểu tổn thương chính *</label>
            <select id="surveyVulnerability" class="input" required>
              <option value="">-- Chọn kiểu tổn thương --</option>
              <option value="Lao động thu nhập thấp">Lao động thu nhập thấp</option>
              <option value="Trẻ em">Trẻ em</option>
              <option value="Người già">Người già</option>
              <option value="Khuyết tật">Khuyết tật</option>
              <option value="Vùng thiên tai">Vùng thiên tai</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div class="input-group">
            <label>Thu nhập hàng tháng</label>
            <input id="surveyMonthlyIncome" class="input" placeholder="VD: 4.500.000 VND" />
          </div>
          <div class="input-group">
            <label>Điều kiện sống *</label>
            <select id="surveyLivingCondition" class="input" required>
              <option value="">-- Chọn điều kiện sống --</option>
              <option value="Nhà riêng/Chung cư">Nhà riêng/Chung cư</option>
              <option value="Nhà tạm/Phòng trọ">Nhà tạm/Phòng trọ</option>
              <option value="Nhà tạm/Phòng trọ không đủ điều kiện">Nhà tạm/Phòng trọ không đủ điều kiện</option>
              <option value="Vô gia cư">Vô gia cư</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div class="input-group">
            <label>Tháng khảo sát</label>
            <input id="surveyMonth" class="input" placeholder="VD: 03/2025" />
          </div>
        </div>

        <div class="input-group">
          <label>Nhu cầu đặc biệt</label>
          <input id="surveySpecialNeeds" class="input" placeholder="VD: Hỗ trợ thực phẩm, dụng cụ sinh hoạt" />
        </div>

        <div class="input-group">
          <label>Ghi chú thêm</label>
          <textarea id="surveyNotes" class="input" rows="3"
            placeholder="Mô tả thêm về tình hình đặc biệt của hộ..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 8px;">
          ✓ Lưu khảo sát
        </button>
      </form>
    </div>

    <div class="panel">
      <h2 class="panel-title">📊 Lịch sử khảo sát theo hộ</h2>
      <p class="panel-subtitle">
        Xem lại các khảo sát đã thực hiện. Có thể lọc theo hộ gia đình.
      </p>

      <div class="input-group" style="max-width: 260px;">
        <label>Lọc theo hộ gia đình</label>
        <select id="surveyFilterHousehold" class="input">
          <option value="">-- Tất cả hộ --</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Mã khảo sát</th>
              <th>Hộ gia đình</th>
              <th>Tháng/Năm</th>
              <th>Thành viên</th>
              <th>Trẻ em</th>
              <th>Người già</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody id="surveyTableBody"></tbody>
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

  // Đổ dropdown hộ
  const hhSelect = document.getElementById("surveyHouseholdId");
  const hhFilterSelect = document.getElementById("surveyFilterHousehold");
  surveyHouseholds.forEach((hh) => {
    const opt1 = document.createElement("option");
    opt1.value = hh.id;
    opt1.textContent = `${hh.id} – ${hh.name}`;
    hhSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = hh.id;
    opt2.textContent = `${hh.id} – ${hh.name}`;
    hhFilterSelect.appendChild(opt2);
  });

  // Tự fill tháng hiện tại
  const monthInput = document.getElementById("surveyMonth");
  if (monthInput && !monthInput.value) {
    const now = new Date();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const y = now.getFullYear();
    monthInput.value = `${m}/${y}`;
  }

  // Khi chọn hộ -> tự fill tên chủ hộ
  hhSelect.addEventListener("change", () => {
    const value = hhSelect.value;
    const hh = surveyHouseholds.find((h) => h.id === value);
    const ownerInput = document.getElementById("surveyHouseholder");
    if (ownerInput) {
      ownerInput.value = hh ? hh.name : "";
    }
  });

  // Submit form khảo sát
  const form = document.getElementById("clSurveyForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const householdId = hhSelect.value;
    if (!householdId) {
      alert("Vui lòng chọn hộ gia đình.");
      return;
    }

    const hh = surveyHouseholds.find((h) => h.id === householdId);
    const householder =
      document.getElementById("surveyHouseholder").value || (hh && hh.name) || "";
    const totalMembers = Number(
      document.getElementById("surveyTotalMembers").value || 0
    );
    const childrenCount = Number(
      document.getElementById("surveyChildren").value || 0
    );
    const elderlyCount = Number(
      document.getElementById("surveyElderly").value || 0
    );
    const vulnerabilityType =
      document.getElementById("surveyVulnerability").value;
    const monthlyIncome = document.getElementById("surveyMonthlyIncome").value || "";
    const livingCondition = document.getElementById("surveyLivingCondition").value;
    const specialNeeds = document.getElementById("surveySpecialNeeds").value || "";
    const month = document.getElementById("surveyMonth").value || "";
    const notes = document.getElementById("surveyNotes").value || "";

    if (!totalMembers || totalMembers <= 0) {
      alert("Số thành viên phải lớn hơn 0.");
      return;
    }
    if (!livingCondition) {
      alert("Vui lòng chọn điều kiện sống.");
      return;
    }

    const now = new Date();
    const surveyDate = now.toISOString().slice(0, 16).replace("T", " ");
    const surveyId = `SV_${Date.now()}`;

    clSurveys.unshift({
      surveyId,
      householdId,
      householdName: (hh && hh.name) || householder,
      leader: "Community Leader", // Có thể lấy từ thông tin đăng nhập
      month,
      surveyDate,
      householder,
      totalMembers,
      childrenCount,
      elderlyCount,
      vulnerabilityType,
      monthlyIncome,
      livingCondition,
      specialNeeds,
      notes,
      status: "Hoàn thành",
    });
    saveSurveys();
    alert("Đã lưu khảo sát mới.");
    form.reset();
    if (monthInput && !monthInput.value) {
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const y = now.getFullYear();
      monthInput.value = `${m}/${y}`;
    }
    renderSurveyList();
  });

  // Lọc lịch sử
  hhFilterSelect.addEventListener("change", () => {
    renderSurveyList();
  });

  renderSurveyList();
}

function renderSurveyList() {
  const tbody = document.getElementById("surveyTableBody");
  const filterSelect = document.getElementById("surveyFilterHousehold");
  if (!tbody) return;

  const filterId = filterSelect ? filterSelect.value : "";
  tbody.innerHTML = "";

  const list = clSurveys.filter((s) =>
    filterId ? s.householdId === filterId : true
  );

  list.forEach((survey) => {
    const hh = surveyHouseholds.find((h) => h.id === survey.householdId);
    const statusClass = survey.status === "Hoàn thành" ? "status-Delivered" : "status-InTransit";
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <button class="order-id" onclick="openSurveyDetail('${survey.surveyId}')" style="background: none; border: none; color: #000000ff; cursor: pointer; font-size: 0.9rem; font-weight: 600; padding: 0;">
          ${survey.surveyId}
        </button>
      </td>
      <td>${survey.householdId} – ${(hh && hh.name) || ""}</td>
      <td>${survey.month || ""}</td>
      <td>${survey.totalMembers}</td>
      <td>${survey.childrenCount}</td>
      <td>${survey.elderlyCount}</td>
      <td>
        <span class="status-pill ${statusClass}" style="font-size: 0.75rem;">✓ ${survey.status || "Hoàn thành"}</span>
      </td>
      <td>
        <button class="btn btn-outline" onclick="openSurveyDetail('${survey.surveyId}')" style="padding: 4px 8px; font-size: 0.8rem;">
          Xem
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openSurveyDetail(surveyId) {
  const survey = clSurveys.find((s) => s.surveyId === surveyId);
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
            <div class="info-value" style="font-size: 0.85rem;">${survey.leader || "Community Leader"}</div>
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
            <div class="info-value">${survey.monthlyIncome || "Chưa cung cấp"}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Điều Kiện Sống</div>
            <div class="info-value" style="font-size: 0.85rem;">${survey.livingCondition}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Nhu Cầu Đặc Biệt</div>
            <div class="info-value" style="font-size: 0.85rem;">${survey.specialNeeds || "Không có"}</div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
        <h3 style="margin: 0 0 10px; font-size: 0.95rem; color: #6b7280; text-transform: uppercase; font-weight: 600;">Ghi Chú</h3>
        <p style="margin: 0; color: #4b5563; line-height: 1.6; background: #f9fafb; padding: 12px; border-radius: 8px;">
          ${survey.notes || "Không có ghi chú thêm."}
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

// ===== Trang: Quản lý danh sách hộ yếu thế =====
let editingHouseholdId = null;

function renderHouseholdsPage() {
  const contentArea = document.getElementById("contentArea");
  if (!contentArea) return;

  contentArea.innerHTML = `
    <div class="panel">
      <h2 class="panel-title">👥 Thông tin hộ yếu thế</h2>
      <p class="panel-subtitle">
        Thêm mới hoặc cập nhật thông tin hộ yếu thế trong khu vực phụ trách.
      </p>

      <form id="householdForm">
        <div class="info-grid">
          <div class="input-group">
            <label>Mã hộ yếu thế (HH_ID) *</label>
            <input id="hhId" class="input" required />
          </div>
          <div class="input-group">
            <label>Tên hộ / Chủ hộ *</label>
            <input id="hhName" class="input" required />
          </div>
          <div class="input-group">
            <label>Số điện thoại</label>
            <input id="hhPhone" class="input" />
          </div>
          <div class="input-group">
            <label>Địa chỉ</label>
            <input id="hhAddress" class="input" />
          </div>
        </div>

        <div class="input-group">
          <label>Kiểu tổn thương chính</label>
          <input id="hhVulnerability" class="input"
            placeholder="VD: Lao động thu nhập thấp / Người già" />
        </div>

        <div style="display:flex; gap:8px; margin-top:8px;">
          <button type="submit" class="btn btn-primary" style="flex:1;">
            ✓ Lưu hộ yếu thế
          </button>
          <button type="button" id="hhResetBtn" class="btn btn-outline" style="flex:1;">
            Xóa form
          </button>
        </div>
      </form>
    </div>

    <div class="panel">
      <h2 class="panel-title">📋 Danh sách hộ yếu thế (${surveyHouseholds.length})</h2>

      <div class="input-group" style="max-width:260px;">
        <label>Tìm kiếm theo mã hoặc tên</label>
        <input id="hhSearch" class="input" placeholder="Nhập HH_ID hoặc tên hộ..." />
      </div>

      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Mã hộ</th>
              <th>Tên hộ</th>
              <th>Điện thoại</th>
              <th>Địa chỉ</th>
              <th>Tổn thương</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody id="hhTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  const form = document.getElementById("householdForm");
  const resetBtn = document.getElementById("hhResetBtn");
  const searchInput = document.getElementById("hhSearch");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("hhId").value.trim();
    const name = document.getElementById("hhName").value.trim();
    const phone = document.getElementById("hhPhone").value.trim();
    const address = document.getElementById("hhAddress").value.trim();
    const vulnerability = document
      .getElementById("hhVulnerability")
      .value.trim();

    if (!id || !name) {
      alert("Mã hộ và Tên hộ là bắt buộc.");
      return;
    }

    const existingIndex = surveyHouseholds.findIndex((h) => h.id === id);

    if (editingHouseholdId && editingHouseholdId === id) {
      const idx = surveyHouseholds.findIndex((h) => h.id === editingHouseholdId);
      if (idx !== -1) {
        surveyHouseholds[idx] = { id, name, phone, address, vulnerability };
      }
      alert("Đã cập nhật thông tin hộ.");
    } else if (existingIndex !== -1) {
      if (
        confirm(
          "Mã hộ này đã tồn tại. Bạn có muốn ghi đè thông tin hiện tại không?"
        )
      ) {
        surveyHouseholds[existingIndex] = { id, name, phone, address, vulnerability };
        alert("Đã cập nhật thông tin hộ.");
      } else {
        return;
      }
    } else {
      surveyHouseholds.push({ id, name, phone, address, vulnerability });
      alert("Đã thêm hộ yếu thế mới.");
    }

    saveHouseholds();
    editingHouseholdId = null;
    form.reset();
    renderHouseholdTableRows();
  });

  resetBtn.addEventListener("click", () => {
    editingHouseholdId = null;
    form.reset();
  });

  searchInput.addEventListener("input", () => {
    renderHouseholdTableRows(searchInput.value);
  });

  renderHouseholdTableRows();
}

function renderHouseholdTableRows(searchText = "") {
  const tbody = document.getElementById("hhTableBody");
  if (!tbody) return;

  const keyword = searchText.toLowerCase().trim();
  tbody.innerHTML = "";

  surveyHouseholds
    .filter((hh) => {
      if (!keyword) return true;
      return (
        hh.id.toLowerCase().includes(keyword) ||
        hh.name.toLowerCase().includes(keyword)
      );
    })
    .forEach((hh) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${hh.id}</td>
        <td>${hh.name}</td>
        <td>${hh.phone || ""}</td>
        <td>${hh.address || ""}</td>
        <td>${hh.vulnerability || ""}</td>
        <td>
          <button class="btn btn-outline"
            style="padding:4px 8px; font-size:0.8rem;"
            onclick="editHousehold('${hh.id}')">
            Sửa
          </button>
          <button class="btn btn-danger"
            style="padding:4px 8px; font-size:0.8rem; margin-left:4px;"
            onclick="deleteHousehold('${hh.id}')">
            Xóa
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

// Các hàm global cho nút Sửa/Xóa
function editHousehold(hhId) {
  const hh = surveyHouseholds.find((h) => h.id === hhId);
  if (!hh) return;
  editingHouseholdId = hhId;

  document.getElementById("hhId").value = hh.id;
  document.getElementById("hhName").value = hh.name;
  document.getElementById("hhPhone").value = hh.phone || "";
  document.getElementById("hhAddress").value = hh.address || "";
  document.getElementById("hhVulnerability").value = hh.vulnerability || "";
}

function deleteHousehold(hhId) {
  if (!confirm("Bạn có chắc chắn muốn xóa hộ này khỏi danh sách?")) return;
  surveyHouseholds = surveyHouseholds.filter((h) => h.id !== hhId);
  saveHouseholds();
  renderHouseholdTableRows();
}

