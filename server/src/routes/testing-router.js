import express from "express";
import {getAll, postTesting, postTestStatus} from "../controllers/testing-controller.js";
import { getTestAssignee, updateTestAssignee, updateTestStatus} from "../controllers/testing-controller.js";

const router = express.Router();

router.get('/', getAll);
router.get('/:sprintid/assignee/:testid', getTestAssignee)

router.put('/:sprintid/status/:testid', updateTestStatus)
router.post('/:sprintid/status/:testid', postTestStatus)
router.post('/',postTesting)
router.put('/:sprintid/assignee/:testid', updateTestAssignee)

export default router;