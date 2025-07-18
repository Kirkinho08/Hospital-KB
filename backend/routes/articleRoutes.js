const express = require("express");
const router = express.Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleController");

// Routes
router.get("/", getArticles);
router.post("/", createArticle);
router.delete("/:id", deleteArticle);
router.put("/:id", updateArticle);

module.exports = router;
