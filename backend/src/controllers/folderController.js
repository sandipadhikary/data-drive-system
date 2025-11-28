const Folder = require("../models/folderModel");

const createFolder = async (req, res) => {
  const { name, parent } = req.body;
  const folder = await Folder.create({ name, parent: parent || null, user: req.user._id });
  res.status(201).json(folder);
};

const getFolders = async (req, res) => {
  const folders = await Folder.find({ user: req.user._id });
  res.json(folders);
};

const updateFolder = async (req, res) => {
  const folder = await Folder.findById(req.params.id);
  if(!folder) return res.status(404).json({ message: "Folder not found" });
  folder.name = req.body.name || folder.name;
  await folder.save();
  res.json(folder);
};

const deleteFolder = async (req, res) => {
  const folder = await Folder.findById(req.params.id);
  if(!folder) return res.status(404).json({ message: "Folder not found" });
  await folder.remove();
  res.json({ message: "Folder removed" });
};

module.exports = { createFolder, getFolders, updateFolder, deleteFolder };
