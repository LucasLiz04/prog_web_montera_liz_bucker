// backend/upload-server/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Habilita o CORS para que seu front-end React possa fazer requisições
app.use(cors());

// Torna a pasta 'uploads' acessível publicamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do Multer para salvar os arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Salva os arquivos na pasta 'uploads'
  },
  filename: function (req, file, cb) {
    // Garante um nome de arquivo único adicionando a data e hora
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Cria a rota POST para '/upload'
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  
  // Retorna o caminho público do arquivo salvo
  res.status(200).json({ 
    message: 'Upload bem-sucedido!',
    // Ex: http://localhost:4000/uploads/1678886400000.png
    filePath: `http://localhost:${PORT}/uploads/${req.file.filename}` 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de upload rodando na porta ${PORT}`);
});