const File = require("../models/fileModel");

const createFile = async (req, res) => {
  const { folder } = req.body;
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const file = await File.create({
    name: req.file.originalname,
    url: `/uploads/${req.file.filename}`,
    folder: folder || null,
    user: req.user._id
  });
  res.status(201).json(file);
};

const getFiles = async (req, res) => {
  const files = await File.find({ user: req.user._id });
  res.json(files);
};

const updateFile = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ message: "File not found" });
  file.name = req.body.name || file.name;
  await file.save();
  res.json(file);
};

const deleteFile = async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ message: "File not found" });
  await file.remove();
  res.json({ message: "File removed" });
};

module.exports = { createFile, getFiles, updateFile, deleteFile };
