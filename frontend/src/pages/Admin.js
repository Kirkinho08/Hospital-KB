import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

function Admin() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState(""); // ✅ NEW: Tag input as comma-separated string
  const [editingId, setEditingId] = useState(null);
  const editorRef = useRef(null);

  const [darkMode, setDarkmode] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkmode(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const apiKey = process.env.REACT_APP_TINYMCE_API_KEY || "no-api-key";
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Fetch articles from API
  const fetchArticles = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/articles`);
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles", err);
    }
  }, [API_BASE_URL]);
  // Fetch articles on mount
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  // Handle form submission for adding/editing articles
  const handleSubmit = async () => {
    const content = editorRef.current?.getContent() || "";
    if (!title.trim()) return;

    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    try {
      if (editingId) {
        const res = await axios.put(
          `${API_BASE_URL}/api/articles/${editingId}`,
          {
            title,
            content,
            category,
            tags: tagArray, // ✅ Send tags
          }
        );
        setArticles((prev) =>
          prev.map((a) => (a._id === editingId ? res.data : a))
        );
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/articles`, {
          title,
          content,
          category,
          tags: tagArray, // ✅ Send tags
        });
        setArticles([res.data, ...articles]);
      }
      clearForm();
    } catch (err) {
      console.error("Error saving article", err);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a._id !== id));
      if (editingId === id) clearForm();
    } catch (err) {
      console.error("Error deleting article", err);
    }
  };

  const startEditing = (article) => {
    setTitle(article.title);
    setCategory(article.category || "");
    setTags((article.tags || []).join(", ")); // ✅ Load tags into input
    editorRef.current?.setContent(article.content || "");
    setEditingId(article._id);
  };

  const clearForm = () => {
    setTitle("");
    setCategory("");
    setTags(""); // ✅ Clear tags
    editorRef.current?.setContent("");
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="mb-4 text-primary">Admin Panel</h2>

      <div className="mb-4 p-3 bg-light rounded shadow-sm">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Category (e.g., Networking)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* ✅ NEW TAG INPUT */}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Tags (comma separated, e.g., printers, wifi)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <Editor
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 300,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            skin: darkMode ? "oxide-dark" : "oxide",
            content_css: darkMode ? "dark" : "default",
            automatic_uploads: true,
            images_upload_url: "http://localhost:5000/api/upload",
          }}
        />

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success" onClick={handleSubmit}>
            {editingId ? "Update Article" : "Add Article"}
          </button>
          {editingId && (
            <button className="btn btn-secondary" onClick={clearForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <h4 className="mt-5 mb-3 text-secondary">Existing Articles</h4>
      <ul className="list-group shadow-sm">
        {articles.map((article) => (
          <li
            key={article._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{article.title}</strong> —{" "}
              <small className="text-muted">{article.category}</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => startEditing(article)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteArticle(article._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
