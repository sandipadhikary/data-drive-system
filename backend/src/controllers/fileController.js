const File = require("../models/fileModel");
const path = require("path");
const fs = require("fs");

const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const folder = req.body.folder || null;

  try {
    const file = await File.create({
      name: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      folder,
      user: req.user._id
    });
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFiles = async (req, res) => {
  try {
    const folderId = req.query.folder || null;
    const query = { user: req.user._id };
    if (folderId) query.folder = folderId;
    const files = await File.find(query);
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(__dirname, "../../uploads", path.basename(file.url));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await File.deleteOne({ _id: file._id });
    res.json({ message: "File deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadFile, getFiles, deleteFile };
