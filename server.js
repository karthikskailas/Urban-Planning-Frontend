// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Specify the folder where files should be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  }
});

const upload = multer({ storage: storage });

// Route for handling the file upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  
  // File uploaded successfully
  res.json({ success: true, filePath: `/uploads/${req.file.filename}` });
});

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
