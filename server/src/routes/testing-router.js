import express from "express";
import {getAll, updateTestStatus} from "../controllers/testing-controller.js";

const router = express.Router();

router.get('/', getAll);
router.put('/:sprintid/status/:testid', updateTestStatus)

export default router;