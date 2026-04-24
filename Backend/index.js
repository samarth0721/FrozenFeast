const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// ─── Database & Cloudinary ───────────────────────────────────────
require("./config/database").connect();
require("./config/cloudinary").connect();

// ─── Routes ──────────────────────────────────────────────────────
const userRoutes = require("./routes/user");

// Mount at /api/v1/user  → for /profile, /favorites, /signup, /login etc.
app.use("/api/v1/user", userRoutes);

// Mount at /api/v1       → for /icecreams, /shop, /deliveries, /orders etc.
app.use("/api/v1", userRoutes);

// ─── Server ──────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
