// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Failed to fetch articles:", err));
  }, []);

  const totalArticles = articles.length;

  const articlesByCategory = articles.reduce((acc, article) => {
    const category = article.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container">
      <h2 className="mb-4 text-primary">Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Articles</h5>
              <p className="card-text display-6">{totalArticles}</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-4">Articles by Category</h4>
      <ul className="list-group">
        {Object.entries(articlesByCategory).map(([category, count]) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={category}
          >
            <span>{category}</span>
            <span className="badge bg-secondary rounded-pill">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
