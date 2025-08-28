import multer from 'multer';
import { TEMP_FOLDER } from '../constants/tempFolderPath.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_FOLDER);
  },
  filename: function (req, file, cb) {
    const sufix = Date.now();
    cb(null, `${sufix}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
