import React, { useState } from "react";
import axios from "axios";

function CommentForm({ postId, onAddComment }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const response = await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
        author,
        content,
      });
      onAddComment(response.data);
      setAuthor("");
      setContent("");
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Seu nome (opcional)"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva seu comentário..."
        required
      />
      <button type="submit">Comentar</button>
    </form>
  );
}

export default CommentForm;