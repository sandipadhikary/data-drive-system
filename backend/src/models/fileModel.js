const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);
module.exports = File;
