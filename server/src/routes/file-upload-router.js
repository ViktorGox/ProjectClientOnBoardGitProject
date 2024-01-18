import express from 'express';
import multer from "multer";
import {handleFileUpload} from "../controllers/file-upload-controller.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), handleFileUpload);

export default router;