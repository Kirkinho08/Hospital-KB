import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ArticleView() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.error("Failed to fetch article:", err));
  }, [id]);

  if (!article) {
    return <p>Loading article...</p>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </div>
  );
}

export default ArticleView;
