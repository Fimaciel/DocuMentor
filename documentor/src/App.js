import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import PublishPage from "./PublishPage";
import PostDetailPage from "./PostDetailPage";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erro ao carregar publicações:", error));
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage posts={posts} />} />
          <Route path="/publish" element={<PublishPage setPosts={setPosts} />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;