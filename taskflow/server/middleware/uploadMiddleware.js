import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads'),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (_req, file, cb) => {
  const accepted = /jpeg|jpg|png|webp/;
  const ext = accepted.test(path.extname(file.originalname).toLowerCase());
  const mime = accepted.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only images are allowed'));
};

export const upload = multer({ storage, fileFilter });
