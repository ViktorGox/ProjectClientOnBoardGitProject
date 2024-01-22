import express from "express";
import {getAll, getTestAssignee, updateTestAssignee, updateTestStatus} from "../controllers/testing-controller.js";

const router = express.Router();

router.get('/', getAll);
router.get('/:sprintid/assignee/:testid', getTestAssignee)

router.put('/:sprintid/status/:testid', updateTestStatus)
router.put('/:sprintid/assignee/:testid', updateTestAssignee)

export default router;