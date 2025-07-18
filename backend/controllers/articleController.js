const Article = require("../models/Article");

exports.getArticles = async (req, res) => {
  const search = req.query.search || "";
  let query = {};

  if (search) {
    const regex = new RegExp(search, "i"); // Case-insensitive search
    query = {
      $or: [{ title: regex }, { content: regex }, { category: regex }],
    };
  }

  const articles = await Article.find(query).sort({ createdAt: -1 });
  res.json(articles);
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article" });
  }
};

exports.createArticle = async (req, res) => {
  const newArticle = new Article(req.body);
  await newArticle.save();
  res.status(201).json(newArticle);
};

exports.deleteArticle = async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.json({ message: "Article deleted successfully" });
};

exports.updateArticle = async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, category },
      { new: true }
    );

    if (article) res.json(article);
    else res.status(404).json({ message: "Article not found" });
  } catch (error) {
    res.status(500).json({ message: "Error updating article" });
  }
};
