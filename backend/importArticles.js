const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Article = require("./models/Article"); // adjust path if needed

mongoose.connect("mongodb://localhost:27017/your-db-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articles = [];

fs.createReadStream("articles.csv") // or ./data/articles.csv if you move it
  .pipe(csv())
  .on("data", (row) => {
    articles.push({
      title: row.title,
      category: row.category,
      tags: row.tags?.split(",").map((tag) => tag.trim()) || [],
      content: row.content,
      createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
    });
  })
  .on("end", async () => {
    try {
      await Article.insertMany(articles);
      console.log(
        "✅ Import complete! Inserted:",
        articles.length,
        "articles."
      );
    } catch (err) {
      console.error("❌ Import error:", err);
    } finally {
      mongoose.disconnect();
    }
  });
