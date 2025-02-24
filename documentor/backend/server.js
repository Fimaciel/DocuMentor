const express = require("express");
const cors = require("cors");
const db = require("./db");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts ORDER BY createdAt DESC", (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar publicações" });
    }
    res.json(rows);
  });
});

app.post("/posts", upload.single("image"), (req, res) => {
  const { content, author } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "O conteúdo é obrigatório" });
  }

  const stmt = db.prepare("INSERT INTO posts (content, author, image) VALUES (?, ?, ?)");
  stmt.run(content, author || "Anônimo", image, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao criar publicação" });
    }
    res.json({ id: this.lastID, content, author: author || "Anônimo", image, createdAt: new Date() });
  });
  stmt.finalize();
});

app.get("/posts/:id/comments", (req, res) => {
    const { id } = req.params;
    db.all("SELECT * FROM comments WHERE postId = ? ORDER BY createdAt ASC", [id], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao buscar comentários" });
      }
      res.json(rows);
    });
});
  
  app.post("/posts/:id/comments", (req, res) => {
    const { id } = req.params;
    const { author, content } = req.body;
  
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "O conteúdo é obrigatório" });
    }
  
    const stmt = db.prepare("INSERT INTO comments (postId, author, content) VALUES (?, ?, ?)");
    stmt.run(id, author || "Anônimo", content, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao adicionar comentário" });
      }
      res.json({ id: this.lastID, postId: id, author: author || "Anônimo", content, createdAt: new Date() });
    });
    stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});