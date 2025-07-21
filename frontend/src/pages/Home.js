import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getPreview } from "../utility/text";

function Home() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarked, setBookmarked] = useState([]);

  // Load bookmarks from localStorage on first render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarkedArticles")) || [];
    setBookmarked(saved);
  }, []);

  // Fetch articles on page load
  useEffect(() => {
    axios
      .get("/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle bookmark toggle
  const toggleBookmark = (id) => {
    let updated;
    if (bookmarked.includes(id)) {
      updated = bookmarked.filter((bid) => bid !== id);
    } else {
      updated = [...bookmarked, id];
    }
    setBookmarked(updated);
    localStorage.setItem("bookmarkedArticles", JSON.stringify(updated));
  };

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(
      articles.map((a) => a.category || "").filter((cat) => cat.trim() !== "")
    ),
  ];

  // Filter based on search + category
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

  // Get bookmarked articles (for top section)
  const bookmarkedArticles = articles.filter((a) => bookmarked.includes(a._id));

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
          {bookmarkedArticles.length > 0 && (
            <div className="mb-4">
              <h5 className="text-warning">⭐ Bookmarked Articles</h5>
              <ul className="list-group mb-3">
                {bookmarkedArticles.map((article) => (
                  <li
                    key={article._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <Link to={`/article/${article._id}`}>{article.title}</Link>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => toggleBookmark(article._id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h5 className="text-secondary mb-3">{selectedCategory} Articles</h5>
          {filteredArticles.map((article) => (
            <div className="card mb-3 shadow-sm border-0" key={article._id}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{article.title}</h5>
                  <button
                    className="btn btn-sm fs-4"
                    onClick={() => toggleBookmark(article._id)}
                    title="Bookmark"
                  >
                    {bookmarked.includes(article._id) ? "★" : "☆"}
                  </button>
                </div>
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-2">
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge bg-secondary me-2"
                        onClick={() => setSearchTerm(tag)}
                        style={{ cursor: "pointer" }}
                        title={`Filter by tag: ${tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="card-text mt-2">
                  {getPreview(article.content, 100)}
                </p>
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
