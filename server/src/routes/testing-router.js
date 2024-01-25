import express from "express";
import {getAll, postTesting} from "../controllers/testing-controller.js";
import { getTestAssignee, updateTestAssignee, updateTestStatus} from "../controllers/testing-controller.js";

const router = express.Router();

router.get('/', getAll);
router.get('/:sprintid/assignee/:testid', getTestAssignee)

router.put('/:sprintid/status/:testid', updateTestStatus)
router.put('/:sprintid/assignee/:testid', updateTestAssignee)

router.post('/',postTesting)

export default router;