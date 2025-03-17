const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../..', 'uploads');

    try {
      // Asyncronous approach to checking if upload folder exists while non-blocking code.
      await fs.access(uploadPath);
    } catch (err) {
      await fs.mkdir(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    cb(null, filename); 
  }
});

const upload = multer({ storage: storage });

module.exports = { upload };
