const path = require("path");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// DB file
const dbPath = path.join(__dirname, "db", "foodbank.db");
const db = new sqlite3.Database(dbPath);
const userDbPath = path.join(__dirname, "db", "users.db");
const userDb = new sqlite3.Database(userDbPath);

// user table for demo auth (store hashed passwords in real apps)
userDb.serialize(() => {
  userDb.run(
    `CREATE TABLE IF NOT EXISTS users (
      create_time DATETIME DEFAULT (datetime('now')),
      username TEXT PRIMARY KEY,
      password TEXT
    )`
  );
});

// middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "foodbank-demo-secret", // In production move to env var and rotate frequently.
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);
// Static assets for the frontend (HTML + CSS/JS live under /public)
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));
app.use("/css", express.static(path.join(publicDir, "css")));
app.use("/js", express.static(path.join(publicDir, "js")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// create tables + sample data
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS orders (
      order_id TEXT PRIMARY KEY,
      status TEXT,
      campaign_id TEXT,
      warehouse_id TEXT,
      warehouse_name TEXT,
      warehouse_address TEXT,
      warehouse_latitude REAL,
      warehouse_longitude REAL,
      household_id TEXT,
      household_name TEXT,
      household_address TEXT,
      household_latitude REAL,
      household_longitude REAL,
      volunteer_id TEXT,
      volunteer_name TEXT,
      volunteer_phone TEXT,
      volunteer_vehicle_type TEXT,
      volunteer_plate_number TEXT,
      volunteer_max_weight_kg REAL,
      packages_count INTEGER,
      total_weight_kg REAL,
      priority INTEGER,
      package_type TEXT,
      created_time TEXT,
      pickup_time TEXT,
      eta_time TEXT,
      completed_time TEXT,
      route_id TEXT,
      route_start_time TEXT,
      route_total_distance_km REAL,
      notes TEXT
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS campaigns (
      campaign_id TEXT PRIMARY KEY,
      name TEXT,
      area TEXT,
      status TEXT,
      start_date TEXT,
      end_date TEXT,
      description TEXT
    )`
  );

  // sample orders
  db.get("SELECT COUNT(*) as c FROM orders", (err, row) => {
    if (err) return console.error(err);
    if (row.c > 0) return;

    console.log("Inserting sample orders...");

    const stmt = db.prepare(
      `INSERT INTO orders (
        order_id, status, campaign_id, warehouse_id, warehouse_name,
        warehouse_address, warehouse_latitude, warehouse_longitude,
        household_id, household_name, household_address,
        household_latitude, household_longitude,
        volunteer_id, volunteer_name, volunteer_phone,
        volunteer_vehicle_type, volunteer_plate_number, volunteer_max_weight_kg,
        packages_count, total_weight_kg, priority,
        package_type, created_time, pickup_time, eta_time, completed_time,
        route_id, route_start_time, route_total_distance_km, notes
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    );

    stmt.run(
      "25ACDB12",
      "InTransit",
      "CP_2025001",
      "WH_0001",
      "Kho Thủ Đức",
      "P.Linh Trung, Thủ Đức",
      10.8705,
      106.7721,
      "HH_9100402000",
      "Hộ Trần Văn Hùng",
      "P.8, Quận 4",
      10.7605,
      106.7071,
      "VL_9100505678",
      "Nguyễn Văn An",
      "0909000111",
      "Xe máy",
      "59X3-12345",
      60,
      5,
      45,
      1,
      "Hộp + Gạo",
      "2025-04-10 09:00",
      "2025-04-10 09:10",
      "2025-04-10 10:05",
      null,
      "RT_0001",
      "2025-04-10 09:05",
      12.5,
      "Đơn mẫu demo"
    );

    stmt.run(
      "1248F9A0",
      "Delivered",
      "CP_2025001",
      "WH_0002",
      "Kho Quận 4",
      "Đoàn Văn Bơ, P.8, Quận 4",
      10.755,
      106.71,
      "HH_9100888888",
      "Trần Mai Hương",
      "P.8, Quận 4",
      10.757,
      106.708,
      "VL_9100888888",
      "Trần Mai Hương",
      "0909000222",
      "Xe máy",
      "59X3-56789",
      60,
      3,
      30,
      2,
      "Thùng carton",
      "2025-04-10 07:15",
      "2025-04-10 07:25",
      "2025-04-10 08:05",
      "2025-04-10 08:32",
      "RT_0002",
      "2025-04-10 07:20",
      8.2,
      "Đơn mẫu đã giao"
    );

    stmt.finalize();
  });

  // sample campaigns
  db.get("SELECT COUNT(*) as c FROM campaigns", (err, row) => {
    if (err) return console.error(err);
    if (row.c > 0) return;

    console.log("Inserting sample campaigns...");

    const stmt = db.prepare(
      `INSERT INTO campaigns (
        campaign_id, name, area, status, start_date, end_date, description
      ) VALUES (?,?,?,?,?,?,?)`
    );

    stmt.run(
      "CP_2025001",
      "Mái ấm Nhật Hồng",
      "Quận 4, Thủ Đức",
      "Active",
      "2025-04-01",
      "2025-04-30",
      "Chiến dịch hỗ trợ lương thực và nhu yếu phẩm cho hộ yếu thế."
    );
    stmt.run(
      "CP_2025002",
      "Hỗ trợ mùa mưa 2025",
      "Quận 8, Bình Tân",
      "Planning",
      "2025-05-10",
      "2025-06-30",
      "Dự phòng cứu trợ khi mưa bão kéo dài."
    );

    stmt.finalize();
  });
});

const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  if (req.accepts("html")) {
    return res.redirect("/auth.html");
  }
  return res.status(401).json({ error: "unauthorized" });
};

// ========== AUTH ==========

// POST /auth/register
app.post("/auth/register", (req, res) => {
  const username = (req.body.username || "").trim();
  const password = (req.body.password || "").trim();

  if (!username || !password) {
    return res.status(400).json({ error: "username_and_password_required" });
  }

  // Note: use bcrypt or argon2 in production to hash passwords.
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  userDb.run(sql, [username, password], function (err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(409).json({ error: "username_taken" });
      }
      console.error(err);
      return res.status(500).json({ error: "db_error" });
    }

    req.session.user = { username };
    return res.json({ ok: true, username });
  });
});

// POST /auth/login
app.post("/auth/login", (req, res) => {
  const username = (req.body.username || "").trim();
  const password = (req.body.password || "").trim();

  if (!username || !password) {
    return res.status(400).json({ error: "username_and_password_required" });
  }

  userDb.get(
    "SELECT username, password FROM users WHERE username = ?",
    [username],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "db_error" });
      }
      if (!row || row.password !== password) {
        return res.status(401).json({ error: "invalid_credentials" });
      }

      req.session.user = { username: row.username };
      return res.json({ ok: true, username: row.username });
    }
  );
});

// GET /auth/logout
app.get("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/auth.html");
  });
});

// GET /auth/me
app.get("/auth/me", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "unauthorized" });
  }
  return res.json({ user: req.session.user });
});

// Protected welcome page
app.get("/welcome", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "welcome.html"));
});

// ========== API ==========

// GET /api/orders
app.get("/api/orders", (req, res) => {
  const { status, q, sort } = req.query;

  const clauses = [];
  const params = [];

  if (status && status !== "all") {
    if (status === "in-transit") {
      clauses.push("LOWER(status) LIKE '%intransit%'");
    } else {
      clauses.push("LOWER(status) = ?");
      params.push(status.toLowerCase());
    }
  }

  if (q) {
    clauses.push(
      "(order_id LIKE ? OR campaign_id LIKE ? OR volunteer_id LIKE ? OR warehouse_id LIKE ?)"
    );
    const like = `%${q}%`;
    params.push(like, like, like, like);
  }

  let sql = "SELECT * FROM orders";
  if (clauses.length > 0) {
    sql += " WHERE " + clauses.join(" AND ");
  }

  if (sort === "created-desc") {
    sql += " ORDER BY created_time DESC";
  } else if (sort === "priority-asc") {
    sql += " ORDER BY priority ASC";
  } else {
    sql += " ORDER BY eta_time ASC";
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "db_error" });
    }
    res.json(rows);
  });
});

// POST /api/orders (upsert)
app.post("/api/orders", (req, res) => {
  const o = req.body || {};
  if (!o.order_id) return res.status(400).json({ error: "order_id_required" });

  const sql = `
    INSERT INTO orders (
      order_id, status, campaign_id, warehouse_id,
      household_id, volunteer_id, route_id,
      package_type, packages_count, total_weight_kg, priority,
      created_time, pickup_time, eta_time, completed_time, notes
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ON CONFLICT(order_id) DO UPDATE SET
      status=excluded.status,
      campaign_id=excluded.campaign_id,
      warehouse_id=excluded.warehouse_id,
      household_id=excluded.household_id,
      volunteer_id=excluded.volunteer_id,
      route_id=excluded.route_id,
      package_type=excluded.package_type,
      packages_count=excluded.packages_count,
      total_weight_kg=excluded.total_weight_kg,
      priority=excluded.priority,
      created_time=excluded.created_time,
      pickup_time=excluded.pickup_time,
      eta_time=excluded.eta_time,
      completed_time=excluded.completed_time,
      notes=excluded.notes
  `;

  const params = [
    o.order_id,
    o.status || "Upcoming",
    o.campaign_id || null,
    o.warehouse_id || null,
    o.household_id || null,
    o.volunteer_id || null,
    o.route_id || null,
    o.package_type || null,
    o.packages_count || null,
    o.total_weight_kg || null,
    o.priority || null,
    o.created_time || null,
    o.pickup_time || null,
    o.eta_time || null,
    o.completed_time || null,
    o.notes || null,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "db_error" });
    }
    res.json({ ok: true, order_id: o.order_id });
  });
});

// fake checkpoints
app.get("/api/orders/:id/checkpoints", (req, res) => {
  const id = req.params.id;
  const base = [
    { time: "09:05", title: "Rời kho", meta: "Kho xuất phát", state: "done" },
    {
      time: "09:30",
      title: "Điểm tập kết",
      meta: "Đang trung chuyển",
      state: "current",
    },
    {
      time: "--:--",
      title: "Giao cho hộ gia đình",
      meta: `Order #${id}`,
      state: "pending",
    },
  ];
  res.json(base);
});

// fake items
app.get("/api/orders/:id/items", (req, res) => {
  res.json([
    {
      order_item_id: "PKG001",
      product_name: "Gạo 5kg",
      category: "Lương thực",
      quantity: 2,
      unit: "Bao",
      weight_kg: 10,
    },
    {
      order_item_id: "PKG002",
      product_name: "Mì gói",
      category: "Lương thực",
      quantity: 3,
      unit: "Thùng",
      weight_kg: 9,
    },
    {
      order_item_id: "PKG003",
      product_name: "Dầu ăn 1L",
      category: "Đồ thiết yếu",
      quantity: 4,
      unit: "Chai",
      weight_kg: 4,
    },
  ]);
});

// POST /api/campaigns
app.post("/api/campaigns", (req, res) => {
  const c = req.body || {};
  if (!c.campaign_id)
    return res.status(400).json({ error: "campaign_id_required" });

  const sql = `
    INSERT INTO campaigns (campaign_id, name, area, status, start_date, end_date, description)
    VALUES (?,?,?,?,?,?,?)
    ON CONFLICT(campaign_id) DO UPDATE SET
      name=excluded.name,
      area=excluded.area,
      status=excluded.status,
      start_date=excluded.start_date,
      end_date=excluded.end_date,
      description=excluded.description
  `;
  const params = [
    c.campaign_id,
    c.name || null,
    c.area || null,
    c.status || "Active",
    c.start_date || null,
    c.end_date || null,
    c.description || null,
  ];
  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "db_error" });
    }
    res.json({ ok: true, campaign_id: c.campaign_id });
  });
});

// GET /api/campaigns
app.get("/api/campaigns", (req, res) => {
  db.all(
    "SELECT * FROM campaigns ORDER BY start_date DESC",
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "db_error" });
      }
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Foodbank backend listening on http://localhost:${PORT}`);
});
