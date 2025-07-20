import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

function Admin() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const editorRef = useRef(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("/api/articles");
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles", err);
    }
  };

  const handleSubmit = async () => {
    const content = editorRef.current?.getContent() || "";
    if (!title.trim()) return;

    try {
      if (editingId) {
        const res = await axios.put(`/api/articles/${editingId}`, {
          title,
          content,
          category,
        });
        setArticles((prev) =>
          prev.map((a) => (a._id === editingId ? res.data : a))
        );
      } else {
        const res = await axios.post("/api/articles", {
          title,
          content,
          category,
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
      await axios.delete(`/api/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a._id !== id));
      if (editingId === id) clearForm();
    } catch (err) {
      console.error("Error deleting article", err);
    }
  };

  const startEditing = (article) => {
    setTitle(article.title);
    setCategory(article.category || "");
    editorRef.current?.setContent(article.content || "");
    setEditingId(article._id);
  };

  const clearForm = () => {
    setTitle("");
    setCategory("");
    editorRef.current?.setContent("");
    setEditingId(null);
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <div className="mb-4">
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

        <Editor
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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

      <h4>Existing Articles</h4>
      <ul className="list-group">
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
