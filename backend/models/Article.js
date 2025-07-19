const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    category: { type: String },
    subcategory: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
