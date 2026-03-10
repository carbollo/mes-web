const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const INDEX_PATH = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  if (req.url !== "/" && req.url !== "/index.html") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("Not found");
    return;
  }

  fs.readFile(INDEX_PATH, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Error interno");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(data);
  });
});

server.listen(PORT, () => {
  // Simple log for Railway console
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

