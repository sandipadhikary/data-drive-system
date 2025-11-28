const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");
const { uploadFile, getFiles, deleteFile } = require("../controllers/fileController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post("/", protect, upload.single("file"), uploadFile);
router.get("/", protect, getFiles);
router.delete("/:id", protect, deleteFile);

module.exports = router;
