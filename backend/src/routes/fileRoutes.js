const express = require("express");
const { createFile, getFiles, updateFile, deleteFile } = require("../controllers/fileController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.route("/").post(protect, upload.single("file"), createFile).get(protect, getFiles);
router.route("/:id").put(protect, updateFile).delete(protect, deleteFile);

module.exports = router;
