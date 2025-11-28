const Folder = require("../models/folderModel");
const File = require("../models/fileModel");
const path = require("path");
const fs = require("fs");

async function deleteFolderRecursive(folderId, userId) {
  const subFolders = await Folder.find({ parent: folderId, user: userId });

  for (const subFolder of subFolders) {
    await deleteFolderRecursive(subFolder._id, userId);
  }

  const files = await File.find({ folder: folderId, user: userId });

  for (const file of files) {
    const filePath = path.join(__dirname, "../../uploads", path.basename(file.url));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await File.deleteOne({ _id: file._id });
  }

  await Folder.deleteOne({ _id: folderId });
}

const createFolder = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const folder = await Folder.create({
      name,
      parent: parent || null,
      user: req.user._id
    });
    res.status(201).json(folder);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const getFolders = async (req, res) => {
  try {
    const parent = req.query.parent || null;
    const folders = await Folder.find({ parent, user: req.user._id });
    res.json(folders);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const userId = req.user._id;
    await deleteFolderRecursive(folderId, userId);
    res.json({ message: "Folder deleted" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createFolder, getFolders, deleteFolder };
