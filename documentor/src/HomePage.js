import React from "react";
import { Link } from "react-router-dom";

function HomePage({ posts }) {
  return (
    <div className="home-page">
      <h2>Últimas Publicações</h2>
      {posts.length === 0 ? (
        <p>Nenhuma publicação ainda. Seja o primeiro a postar!</p>
      ) : (
        posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`} className="post-card">
            {post.image && <img src={post.image} alt="Publicação" className="post-image" />}
            <p>{post.content}</p>
            <small>
              Por {post.author || "Anônimo"} em {new Date(post.createdAt).toLocaleString()}
            </small>
          </Link>
        ))
      )}
    </div>
  );
}

export default HomePage;