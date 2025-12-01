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

let clHouseholds = loadHouseholds();

function saveHouseholds() {
  localStorage.setItem(CL_HOUSEHOLDS_KEY, JSON.stringify(clHouseholds));
}

// ===== Demo surveys mặc định =====
const defaultSurveys = [
  {
    surveyId: "SV_001",
    householdId: "HH_9100402000",
    month: "03/2025",
    surveyDate: "2025-03-01 14:30",
    householder: "Trần Văn Hùng",
    totalMembers: 5,
    childrenCount: 1,
    elderlyCount: 1,
    vulnerabilityType: "Lao động thu nhập thấp / Người già",
    notes: "Hộ có người bị bệnh mãn tính, cần hỗ trợ thường xuyên",
  },
  {
    surveyId: "SV_002",
    householdId: "HH_9100501001",
    month: "02/2025",
    surveyDate: "2025-02-15 10:15",
    householder: "Nguyễn Thị Lan",
    totalMembers: 4,
    childrenCount: 2,
    elderlyCount: 0,
    vulnerabilityType: "Trẻ em / Thu nhập thấp",
    notes: "Cần hỗ trợ gạo và sữa cho trẻ",
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
            <label>Tháng khảo sát</label>
            <input id="surveyMonth" class="input" placeholder="VD: 03/2025" />
          </div>
        </div>

        <div class="input-group">
          <label>Ghi chú thêm</label>
          <textarea id="surveyNotes" class="input" rows="3"
            placeholder="Mô tả thêm về nhu cầu đặc biệt nếu có..."></textarea>
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
              <th>Kiểu tổn thương</th>
            </tr>
          </thead>
          <tbody id="surveyTableBody"></tbody>
        </table>
      </div>
    </div>
  `;

  // Đổ dropdown hộ
  const hhSelect = document.getElementById("surveyHouseholdId");
  const hhFilterSelect = document.getElementById("surveyFilterHousehold");
  clHouseholds.forEach((hh) => {
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
    const hh = clHouseholds.find((h) => h.id === value);
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

    const hh = clHouseholds.find((h) => h.id === householdId);
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
    const month = document.getElementById("surveyMonth").value || "";
    const notes = document.getElementById("surveyNotes").value || "";

    if (!totalMembers || totalMembers <= 0) {
      alert("Số thành viên phải lớn hơn 0.");
      return;
    }

    const now = new Date();
    const surveyDate = now.toISOString().slice(0, 16).replace("T", " ");
    const surveyId = `SV_${Date.now()}`;

    clSurveys.unshift({
      surveyId,
      householdId,
      month,
      surveyDate,
      householder,
      totalMembers,
      childrenCount,
      elderlyCount,
      vulnerabilityType,
      notes,
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
    const hh = clHouseholds.find((h) => h.id === survey.householdId);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${survey.surveyId}</td>
      <td>${survey.householdId} – ${(hh && hh.name) || ""}</td>
      <td>${survey.month || ""}</td>
      <td>${survey.totalMembers}</td>
      <td>${survey.childrenCount}</td>
      <td>${survey.elderlyCount}</td>
      <td>${survey.vulnerabilityType}</td>
    `;
    tbody.appendChild(tr);
  });
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
      <h2 class="panel-title">📋 Danh sách hộ yếu thế (${clHouseholds.length})</h2>

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

    const existingIndex = clHouseholds.findIndex((h) => h.id === id);

    if (editingHouseholdId && editingHouseholdId === id) {
      const idx = clHouseholds.findIndex((h) => h.id === editingHouseholdId);
      if (idx !== -1) {
        clHouseholds[idx] = { id, name, phone, address, vulnerability };
      }
      alert("Đã cập nhật thông tin hộ.");
    } else if (existingIndex !== -1) {
      if (
        confirm(
          "Mã hộ này đã tồn tại. Bạn có muốn ghi đè thông tin hiện tại không?"
        )
      ) {
        clHouseholds[existingIndex] = { id, name, phone, address, vulnerability };
        alert("Đã cập nhật thông tin hộ.");
      } else {
        return;
      }
    } else {
      clHouseholds.push({ id, name, phone, address, vulnerability });
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

  clHouseholds
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
  const hh = clHouseholds.find((h) => h.id === hhId);
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
  clHouseholds = clHouseholds.filter((h) => h.id !== hhId);
  saveHouseholds();
  renderHouseholdTableRows();
}
