import React, { useState } from "react";

function PostForm({ addPost }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return; 

    const newPost = {
      id: Date.now(), 
      content,
      createdAt: new Date().toLocaleString(), 
    };

    addPost(newPost);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="O que você quer documentar?"
        required
      />
      <button type="submit">Publicar</button>
    </form>
  );
}

export default PostForm;