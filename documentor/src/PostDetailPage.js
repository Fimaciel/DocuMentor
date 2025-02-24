import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

function PostDetailPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const postId = window.location.pathname.split("/")[2];

  useEffect(() => {
    // Carrega a publicação
    axios.get(`http://localhost:5000/posts/${postId}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Erro ao carregar publicação:", error));

    // Carrega os comentários
    axios.get(`http://localhost:5000/posts/${postId}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Erro ao carregar comentários:", error));
  }, [postId]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (!post) return <p>Carregando...</p>;

  return (
    <div className="post-detail-page">
      <h2>{post.content}</h2>
      {post.image && <img src={post.image} alt="Publicação" className="post-image" />}
      <small>
        Por {post.author || "Anônimo"} em {new Date(post.createdAt).toLocaleString()}
      </small>

      <h3>Comentários</h3>
      <CommentForm postId={postId} onAddComment={handleAddComment} />
      {comments.length === 0 ? (
        <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <small>
              Por {comment.author || "Anônimo"} em {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default PostDetailPage;