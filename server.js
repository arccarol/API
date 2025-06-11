const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // permite requisições de qualquer domínio

// Rota para pegar todos os livros lendo do arquivo JSON
app.get("/api/livros", (req, res) => {
  const jsonPath = path.join(__dirname, "livros.json");

  fs.readFile(jsonPath, "utf8", (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo JSON:", err);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }

    try {
      const livros = JSON.parse(data);
      res.json(livros);
    } catch (e) {
      console.error("Erro ao parsear JSON:", e);
      res.status(500).json({ erro: "Erro interno do servidor" });
    }
  });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
