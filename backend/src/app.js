const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/users", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => res.send("Backend running"));

module.exports = app;
