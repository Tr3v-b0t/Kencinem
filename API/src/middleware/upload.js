
import dotenv from 'dotenv';
import cloudinary from 'cloudinary'
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = cloudinaryStorage({
  cloudinary, folder: 'movie posters', allowedFormats: ['jpg', 'png', 'gif'], transformation: [{ width: 500, height: 500, crop: 'limit' }],
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1020 * 5,
  },
  fileFilter,

}).single('image');

export default upload
