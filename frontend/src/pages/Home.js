import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getPreview } from "../utility/text";

function Home() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch articles on page load
  useEffect(() => {
    axios
      .get("/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Extract unique categories from the articles
  const categories = [
    "All",
    ...new Set(
      articles.map((a) => a.category || "").filter((cat) => cat.trim() !== "")
    ),
  ];

  // Filter based on category and search
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    const term = searchTerm.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(term) ||
      article.content.toLowerCase().includes(term) ||
      (article.category && article.category.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h2 className="text-primary mb-4">Knowledge Base</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search articles by keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row">
        {/* 📁 Category Filter */}
        <div className="col-md-4">
          <h5 className="text-secondary">Categories</h5>
          <ul className="list-group">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`list-group-item ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
                style={{ cursor: "pointer" }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* 📚 Article List */}
        <div className="col-md-8">
          <h5 className="text-secondary mb-3">{selectedCategory} Articles</h5>
          {filteredArticles.map((article) => (
            <div className="card mb-3 shadow-sm border-0" key={article._id}>
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{getPreview(article.content, 100)}</p>
                <Link
                  to={`/article/${article._id}`}
                  className="btn btn-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}

          {/* 🚫 No Results */}
          {filteredArticles.length === 0 && (
            <p className="text-muted">No articles found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
