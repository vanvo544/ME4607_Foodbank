# Hướng Dẫn Trang Household - Foodbank Logistics Hub

## 📋 Tổng Quan

Trang household được tạo tại thư mục `public/for_HH/` với đầy đủ các tính năng để hộ yếu thế theo dõi các dịch vụ hỗ trợ.

## 🎯 Các Tính Năng

### 1. **Kết Quả Khảo Sát** (`survey.js`)
- Xem kết quả khảo sát của chính mình (cố định)
- Hiển thị các thông tin:
  - Mã khảo sát & Mã tài khoản HH
  - Tổ trưởng mở khảo sát
  - Thời điểm thực hiện
  - Chủ hộ khẩu & số thành viên
  - Số trẻ em (≤12 tuổi) & người già (≥60 tuổi)
  - Kiểu tổn thương (Lao động/Trẻ em/Người già/Vùng thiên tai)
  - Ghi chú thêm

### 2. **Theo Dõi Đơn Hàng** (`orders.js`)
- Xem danh sách các đơn hàng giao cho hộ
- Trạng thái đơn hàng: Đã giao, Đang giao, Sắp giao
- Lọc theo trạng thái hoặc tìm kiếm mã đơn
- Xem chi tiết từng đơn hàng (địa điểm, tình nguyện viên, timeline)
- Demo data: 3 đơn hàng mẫu

### 3. **Giám Sát Chuyến Giao** (`trips.js`)
- Xem danh sách các chuyến giao hàng
- Tracking chi tiết: 3 mốc chính (Lấy hàng → Tập kết → Giao hàng)
- Bản đồ OpenStreetMap hiển thị tuyến đường
- Xem tiến độ chuyến giao (progress bar)
- Demo data: 3 chuyến mẫu

### 4. **Xác Nhận Giao Hàng** (`delivery-confirmation.js`)
- Danh sách đơn hàng đã/chưa giao
- Quét QR code để xác nhận nhận hàng
- QR code được tạo tự động cho mỗi đơn
- Chuyển trạng thái sang "Đã giao" sau xác nhận
- Demo data: 3 đơn hàng chưa giao

### 5. **Phản Hồi & Góp Ý** (`feedback.js`)
- Form gửi phản hồi với các trường:
  - Tiêu đề *
  - Loại phản hồi: Tích cực/Góp ý/Vấn đề/Khác
  - Nội dung chi tiết *
  - Tệp đính kèm (tuỳ chọn)
  - Xác nhận đồng ý *
- Lịch sử các phản hồi đã gửi
- Xác nhận gửi thành công

## 🔐 Cấu Trúc Xác Thực

### Tài khoản test cho Household:
```
Số điện thoại: 0928956342
Role: household
Redirect: for_HH/index.html
```

### Auth Flow:
1. Kiểm tra localStorage.currentUser
2. Verify role = "household"
3. Nếu không hợp lệ → redirect tới login.html

## 📁 Cấu Trúc File

```
public/for_HH/
├── index.html                    # Trang chính (dashboard)
├── household.css                 # CSS chung
├── dashboard.js                  # Logic điều hướng
├── survey.js                     # Trang khảo sát
├── orders.js                     # Trang đơn hàng
├── trips.js                      # Trang chuyến giao
├── delivery-confirmation.js      # Trang xác nhận QR
└── feedback.js                   # Trang phản hồi
```

## 🎨 Design

- **Sidebar Navigation**: Menu dọc bên trái với 5 tính năng chính
- **Color Scheme**: Vàng (#facc15) là highlight, xám (#111827) là nền
- **Responsive**: Hỗ trợ mobile, tablet, desktop
- **Status Pills**: Màu sắc khác nhau cho các trạng thái khác nhau

## 🔧 Demo Data

Tất cả pages sử dụng demo data (không kết nối backend):

### Survey Data (1 kết quả cố định)
```javascript
demeSurveyResult = {
  surveyId: "SV_9100402000_001",
  householdId: "HH_9100402000",
  ...
}
```

### Orders Data (3 đơn hàng)
```javascript
householdOrders = [
  { id: "#1248F9A0", status: "Delivered", ... },
  { id: "#25ACDB12", status: "InTransit", ... },
  { id: "#9980F145", status: "Upcoming", ... }
]
```

### Trips Data (3 chuyến)
```javascript
householdTrips = [
  { id: "#25ACDB12", status: "InProcess", ... },
  { id: "#1248F9A0", status: "Completed", ... },
  { id: "#9980F145", status: "Planned", ... }
]
```

### Delivery Orders (tương tự orders, thêm QR code)
```javascript
deliveryOrders = [...]
```

### Feedback (trống, được thêm khi user submit)
```javascript
submittedFeedbacks = []
```

## 🚀 Cách Sử Dụng

### 1. Truy cập trang login
```
http://localhost:5000/public/login.html
```

### 2. Đăng nhập với tài khoản household
```
Số điện thoại: 0928956342
```

### 3. Sẽ được redirect tới
```
http://localhost:5000/public/for_HH/index.html
```

### 4. Điều hướng giữa các trang
- Dùng sidebar menu bên trái
- Click các nút trong nav-item
- Hoặc gọi `goToPage('pageName')`

## 🔄 Dependency Libraries

1. **Leaflet** (Maps): `https://unpkg.com/leaflet@1.9.4/`
2. **QRCode.js**: `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/`

Các thư viện được load từ CDN trong `index.html`.

## 📝 Ghi Chú

- Tất cả data hiện là hardcoded/demo
- Sau này cần kết nối backend API
- Modal sử dụng class `.modal` và `.visible` để toggle
- Status filter hoạt động trên client-side
- QR code được tạo bằng QRCode.js library

## 🔮 Cải Tiến Tương Lai

1. Kết nối backend API
2. Real-time tracking với WebSocket
3. Push notification cho trạng thái đơn hàng
4. Camera scanner cho QR code trực tiếp
5. Multi-language support (Tiếng Anh, Tiếng Trung)
6. Offline mode với localStorage
7. Rating/review cho tình nguyện viên
8. Lịch sử giao hàng dài hạn

---

**Tạo bởi**: GitHub Copilot
**Ngày**: November 30, 2025
