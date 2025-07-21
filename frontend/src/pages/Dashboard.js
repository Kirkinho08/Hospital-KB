// src/pages/Dashboard.js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
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
    const category = article.category?.trim() || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(articlesByCategory).map(
    ([category, count]) => ({
      name: category,
      count,
    })
  );

  const tagCounts = articles.reduce((acc, article) => {
    (article.tags || []).forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const recentArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
    )
    .slice(0, 5);

  const missingCategory = articles.filter((a) => !a.category?.trim()).length;
  const missingTags = articles.filter(
    (a) => !a.tags || a.tags.length === 0
  ).length;

  return (
    <div className="container">
      <h2 className="mb-4 text-primary">Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Articles</h5>
              <p className="card-text display-6">{totalArticles}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Missing Category</h5>
              <p className="card-text display-6">{missingCategory}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Missing Tags</h5>
              <p className="card-text display-6">{missingTags}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles by Category */}
      <h4 className="mt-4">Articles by Category</h4>
      <ul className="list-group mb-4">
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

      <h5 className="mt-4">Category Chart</h5>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={categoryChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Articles by Tag */}
      <h4 className="mt-4">Articles by Tag</h4>
      <ul className="list-group mb-4">
        {Object.entries(tagCounts).map(([tag, count]) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={tag}
          >
            <span>{tag}</span>
            <span className="badge bg-info rounded-pill">{count}</span>
          </li>
        ))}
      </ul>

      {/* Recent Articles */}
      <h4 className="mt-4">Recently Updated</h4>
      <ul className="list-group">
        {recentArticles.map((article) => (
          <li className="list-group-item" key={article._id}>
            <strong>{article.title}</strong>
            <div className="text-muted small">
              {new Date(
                article.updatedAt || article.createdAt
              ).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
