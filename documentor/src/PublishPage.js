import React, { useState } from "react";
import axios from "axios";

function PublishPage({ setPosts }) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null); // Armazena o arquivo da imagem
  const [preview, setPreview] = useState(""); // Armazena a URL da prévia da imagem

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Cria uma URL temporária para visualização
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("content", content);
    formData.append("author", author || "Anônimo");
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("http://localhost:5000/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setContent("");
      setAuthor("");
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error("Erro ao publicar:", error);
    }
  };

  return (
    <div className="publish-page">
      <h2>Criar Nova Publicação</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Seu nome (opcional)"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="O que você quer documentar?"
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Prévia" className="image-preview" />}
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}

export default PublishPage;