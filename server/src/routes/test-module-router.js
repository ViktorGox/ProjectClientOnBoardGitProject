import express from 'express';
import {getById} from "../controllers/test-module-controller.js";

const router = express.Router();

router.get('/', getById);
router.get("/module/:moduleid", getById);
router.get("/test/:testid", getById)

export default router;