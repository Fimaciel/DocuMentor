import React from "react";

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>Nenhuma publicação ainda. Seja o primeiro a postar!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            <small>{post.createdAt}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;