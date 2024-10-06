import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

app.post('/api/images', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({
    id: Date.now(),
    src: `/images/${req.file.filename}`,
    title: req.body.title,
    category: req.body.category
  });
});

// Vite integration
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'spa'
});

app.use(vite.middlewares);

// Serve static files from the dist directory
app.use(express.static(path.resolve(__dirname, 'dist')));

// Handle all other routes
app.get('*', async (req, res) => {
  const url = req.originalUrl;
  try {
    // Attempt to serve the file directly
    const filePath = path.resolve(__dirname, 'dist', url.slice(1));
    res.sendFile(filePath);
  } catch (e) {
    // If the file doesn't exist, serve index.html
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});