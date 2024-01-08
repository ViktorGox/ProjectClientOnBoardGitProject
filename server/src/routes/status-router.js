import express from 'express';
import {getStatusById, getStatusQuery} from "../controllers/status-controller.js";

const router = express.Router();

router.get("/", getStatusQuery);
router.get("/:statusid", getStatusById);

export default router;