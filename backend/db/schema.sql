PRAGMA foreign_keys = ON;

-- =========================
-- FOODBANK LOGISTICS DB
-- =========================

-- Campaign
CREATE TABLE IF NOT EXISTS campaigns (
    campaign_id      TEXT PRIMARY KEY,
    name             TEXT NOT NULL,
    description      TEXT,
    start_date       TEXT,
    end_date         TEXT,
    status           TEXT DEFAULT 'Active'
);

-- Area (khu vực / tổ dân phố)
CREATE TABLE IF NOT EXISTS areas (
    area_id     TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    district    TEXT,
    city        TEXT,
    notes       TEXT
);

-- Warehouse & điểm tập kết
CREATE TABLE IF NOT EXISTS warehouses (
    warehouse_id     TEXT PRIMARY KEY,
    name             TEXT NOT NULL,
    type             TEXT,
    area_id          TEXT,
    address          TEXT,
    latitude         REAL,
    longitude        REAL,
    capacity_kg      REAL,
    active           INTEGER DEFAULT 1,
    FOREIGN KEY(area_id) REFERENCES areas(area_id)
);

-- Household (hộ gia đình yếu thế)
CREATE TABLE IF NOT EXISTS households (
    household_id     TEXT PRIMARY KEY,
    full_name        TEXT NOT NULL,
    phone            TEXT,
    address          TEXT,
    area_id          TEXT,
    latitude         REAL,
    longitude        REAL,
    vulnerability    TEXT,
    notes            TEXT,
    FOREIGN KEY(area_id) REFERENCES areas(area_id)
);

-- Volunteer (tình nguyện viên)
CREATE TABLE IF NOT EXISTS volunteers (
    volunteer_id     TEXT PRIMARY KEY,
    full_name        TEXT NOT NULL,
    phone            TEXT,
    area_id          TEXT,
    vehicle_type     TEXT,
    plate_number     TEXT,
    max_weight_kg    REAL,
    status           TEXT DEFAULT 'Available',
    FOREIGN KEY(area_id) REFERENCES areas(area_id)
);

-- Order
CREATE TABLE IF NOT EXISTS orders (
    order_id            TEXT PRIMARY KEY,
    status              TEXT NOT NULL,
    campaign_id         TEXT,
    warehouse_id        TEXT,
    household_id        TEXT,
    volunteer_id        TEXT,
    route_id            TEXT,
    package_type        TEXT,
    packages_count      INTEGER,
    total_weight_kg     REAL,
    priority            TEXT,
    created_time        TEXT,
    pickup_time         TEXT,
    eta_time            TEXT,
    completed_time      TEXT,
    notes               TEXT,
    FOREIGN KEY(campaign_id)  REFERENCES campaigns(campaign_id),
    FOREIGN KEY(warehouse_id) REFERENCES warehouses(warehouse_id),
    FOREIGN KEY(household_id) REFERENCES households(household_id),
    FOREIGN KEY(volunteer_id) REFERENCES volunteers(volunteer_id)
);

-- OrderItem
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id   TEXT PRIMARY KEY,
    order_id        TEXT NOT NULL,
    product_name    TEXT,
    category        TEXT,
    quantity        INTEGER,
    unit            TEXT,
    weight_kg       REAL,
    FOREIGN KEY(order_id) REFERENCES orders(order_id)
);

-- Route
CREATE TABLE IF NOT EXISTS routes (
    route_id            TEXT PRIMARY KEY,
    volunteer_id        TEXT,
    campaign_id         TEXT,
    warehouse_id        TEXT,
    start_time          TEXT,
    end_time            TEXT,
    total_distance_km   REAL,
    status              TEXT,
    FOREIGN KEY(volunteer_id) REFERENCES volunteers(volunteer_id),
    FOREIGN KEY(campaign_id) REFERENCES campaigns(campaign_id),
    FOREIGN KEY(warehouse_id) REFERENCES warehouses(warehouse_id)
);

-- GPS checkpoint
CREATE TABLE IF NOT EXISTS route_checkpoints (
    checkpoint_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id        TEXT NOT NULL,
    order_id        TEXT,
    seq             INTEGER,
    time            TEXT,
    title           TEXT,
    meta            TEXT,
    state           TEXT,
    latitude        REAL,
    longitude       REAL,
    FOREIGN KEY(route_id) REFERENCES routes(route_id),
    FOREIGN KEY(order_id) REFERENCES orders(order_id)
);

-- Issue
CREATE TABLE IF NOT EXISTS issues (
    issue_id        TEXT PRIMARY KEY,
    order_id        TEXT,
    volunteer_id    TEXT,
    type            TEXT,
    severity        TEXT,
    status          TEXT,
    created_time    TEXT,
    resolved_by     TEXT,
    resolved_time   TEXT,
    notes           TEXT,
    FOREIGN KEY(order_id)     REFERENCES orders(order_id),
    FOREIGN KEY(volunteer_id) REFERENCES volunteers(volunteer_id)
);

-- Feedback
CREATE TABLE IF NOT EXISTS feedbacks (
    feedback_id     TEXT PRIMARY KEY,
    household_id    TEXT,
    order_id        TEXT,
    rating          INTEGER,
    comment         TEXT,
    created_time    TEXT,
    FOREIGN KEY(household_id) REFERENCES households(household_id),
    FOREIGN KEY(order_id)     REFERENCES orders(order_id)
);

-- =========================
-- DỮ LIỆU MẪU
-- =========================

INSERT OR IGNORE INTO campaigns (campaign_id, name, description, start_date, status)
VALUES
('CP_2025001', 'Mái ấm Nhật Hồng', 'Hỗ trợ nhu yếu phẩm cho hộ khó khăn', '2025-03-01', 'Active'),
('CP_2025002', 'Hỗ trợ vùng ngập', 'Cứu trợ lương thực vùng ngập sâu', '2025-03-01', 'Active');

INSERT OR IGNORE INTO areas (area_id, name, district, city) VALUES
('71308', 'P. Linh Trung', 'TP Thủ Đức', 'TP.HCM'),
('700000', 'P.8', 'Quận 4', 'TP.HCM'),
('72818', 'Quận Bình Tân', 'Bình Tân', 'TP.HCM');

INSERT OR IGNORE INTO warehouses (warehouse_id, name, type, area_id, address, latitude, longitude, capacity_kg)
VALUES
('WH_0001', 'Kho Thủ Đức', 'Kho trung tâm', '71308', '1262 Kha Vạn Cân, P. Linh Trung', 10.864390, 106.762077, 5000),
('WH_0002', 'Kho Quận 4', 'Điểm tập kết', '700000', 'Đoàn Văn Bơ, P.8, Quận 4', 10.763000, 106.704000, 2000),
('WH_0003', 'Kho Bình Tân', 'Kho trung tâm', '72818', 'Quận Bình Tân, TP.HCM', 10.800000, 106.620000, 4000);

INSERT OR IGNORE INTO households (household_id, full_name, phone, address, area_id, latitude, longitude)
VALUES
('HH_9100401357', 'Hộ Nguyễn Thị Hoa', '0909000001', '20/4 Xô Viết Nghệ Tĩnh, P.19, Bình Thạnh', '700000', 10.853000, 106.770000),
('HH_9100402000', 'Hộ Trần Văn Hùng', '0909000002', 'P.8, Quận 4', '700000', 10.764500, 106.715000);

INSERT OR IGNORE INTO volunteers (volunteer_id, full_name, phone, area_id, vehicle_type, plate_number, max_weight_kg, status)
VALUES
('VL_9100505678', 'Nguyễn Văn An', '09100505678', '71308', 'Xe máy', '50A1-99999', 80, 'Available'),
('VL_9100888888', 'Trần Mai Hương', '09100888888', '700000', 'Xe máy', '59X3-12345', 60, 'OnRoute');

INSERT OR IGNORE INTO routes (route_id, volunteer_id, campaign_id, warehouse_id, start_time, end_time, total_distance_km, status)
VALUES
('RT_0001', 'VL_9100505678', 'CP_2025001', 'WH_0001', '2025-03-01 09:05', NULL, 12.5, 'InProgress'),
('RT_0002', 'VL_9100888888', 'CP_2025001', 'WH_0002', '2025-03-01 07:30', '2025-03-01 08:35', 9.3, 'Completed'),
('RT_0003', NULL, 'CP_2025002', 'WH_0003', '2025-03-01 14:00', NULL, 14.0, 'Planned');

INSERT OR IGNORE INTO orders (
    order_id, status, campaign_id, warehouse_id, household_id, volunteer_id,
    route_id, package_type, packages_count, total_weight_kg, priority,
    created_time, pickup_time, eta_time, completed_time, notes
) VALUES
('25ACDB12', 'InTransit', 'CP_2025001', 'WH_0001', 'HH_9100401357', 'VL_9100505678',
 'RT_0001', 'Tập kết', 5, 45.0, 'Normal',
 '2025-03-01 09:00', '2025-03-01 09:10', '2025-03-01 10:45', NULL, NULL),

('1248F9A0', 'Delivered', 'CP_2025001', 'WH_0002', 'HH_9100402000', 'VL_9100888888',
 'RT_0002', 'Lẻ', 3, 30.0, 'Normal',
 '2025-03-01 07:15', '2025-03-01 07:25', '2025-03-01 08:05', '2025-03-01 08:32', NULL),

('9980F145', 'Upcoming', 'CP_2025002', 'WH_0003', NULL, NULL,
 'RT_0003', 'Tập kết', 8, 55.0, 'Urgent',
 '2025-03-01 13:30', NULL, '2025-03-01 15:00', NULL, 'Chưa gán TNV');

INSERT OR IGNORE INTO order_items (order_item_id, order_id, product_name, category, quantity, unit, weight_kg) VALUES
('OI_000001', '25ACDB12', 'Gạo 5kg', 'Lương thực', 4, 'Túi', 20.0),
('OI_000002', '25ACDB12', 'Mì gói', 'Mì gói', 3, 'Thùng', 12.5),
('OI_000003', '25ACDB12', 'Sữa hộp', 'Sữa', 2, 'Thùng', 12.5),

('OI_000010', '1248F9A0', 'Gạo 10kg', 'Lương thực', 2, 'Túi', 20.0),
('OI_000011', '1248F9A0', 'Dầu ăn 1L', 'Gia vị', 6, 'Chai', 6.0),
('OI_000012', '1248F9A0', 'Nước mắm', 'Gia vị', 3, 'Chai', 4.0),

('OI_000020', '9980F145', 'Gạo 5kg', 'Lương thực', 6, 'Túi', 30.0),
('OI_000021', '9980F145', 'Mì gói', 'Mì gói', 4, 'Thùng', 16.0),
('OI_000022', '9980F145', 'Nước sạch 20L', 'Đồ dùng thiết yếu', 3, 'Bình', 9.0);

INSERT OR IGNORE INTO route_checkpoints (route_id, order_id, seq, time, title, meta, state, latitude, longitude)
VALUES
('RT_0001', '25ACDB12', 1, '2025-03-01 09:10', 'Kho WH_0001', 'Lat:10.864390 • Lng:106.762077', 'done', 10.864390, 106.762077),
('RT_0001', '25ACDB12', 2, '2025-03-01 09:45', 'Điểm tập kết Linh Trung', 'Status_Log: InProgress', 'current', 10.870000, 106.780000),
('RT_0001', '25ACDB12', 3, '2025-03-01 10:30', 'Giao HH_9100401357', 'Completed_time dự kiến', 'pending', 10.853000, 106.770000),

('RT_0002', '1248F9A0', 1, '2025-03-01 07:35', 'Kho WH_0002', 'Start trip', 'done', 10.763000, 106.704000),
('RT_0002', '1248F9A0', 2, '2025-03-01 08:05', 'Khu vực P.8, Quận 4', 'Status_Log: Delivered', 'done', 10.764500, 106.715000),

('RT_0003', '9980F145', 1, '2025-03-01 13:30', 'Tạo yêu cầu giao', 'Đang tìm Volunteer khả dụng', 'current', 10.800000, 106.620000);
