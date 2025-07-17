const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticleById,
  createArticle,
  deleteArticle,
} = require("../controllers/articleController");

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
