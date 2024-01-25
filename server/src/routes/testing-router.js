import express from "express";
import {getAll, postTesting, postTestStatus} from "../controllers/testing-controller.js";
import { getTestAssignee, updateTestAssignee, updateTestStatus} from "../controllers/testing-controller.js";
import {isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router();

router.get('/', isLoggedIn, getAll);
router.get('/:sprintid/assignee/:testid', isLoggedIn, getTestAssignee)

router.put('/:sprintid/status/:testid', isLoggedIn, updateTestStatus)
router.post('/:sprintid/status/:testid', isLoggedIn, postTestStatus)
router.post('/', isLoggedIn, postTesting)
router.put('/:sprintid/assignee/:testid', isLoggedIn, updateTestAssignee)

export default router;