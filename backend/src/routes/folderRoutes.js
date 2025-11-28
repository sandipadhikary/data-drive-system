const express = require("express");
const router = express.Router();
const { createFolder, getFolders, deleteFolder } = require("../controllers/folderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createFolder);
router.get("/", protect, getFolders);
router.delete("/:id", protect, deleteFolder);

module.exports = router;
