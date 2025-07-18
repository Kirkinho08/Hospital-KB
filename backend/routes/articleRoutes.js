const express = require("express");
const router = express.Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
  updateArticle,
  getArticleById,
} = require("../controllers/articleController");

// routes
router.get("/", getArticles);
router.post("/", createArticle);
router.delete("/:id", deleteArticle);
router.put("/:id", updateArticle);
router.get("/:id", getArticleById);

module.exports = router;
