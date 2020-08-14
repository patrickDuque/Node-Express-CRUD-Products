const multer = require('multer');

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename    : (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 3 }, fileFilter });

module.exports = upload;
