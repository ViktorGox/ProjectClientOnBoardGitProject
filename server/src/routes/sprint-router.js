import express from 'express';
import * as controller from '../controllers/sprint-controller.js';
import {restartSprint} from "../controllers/sprint-controller.js";

const router = express.Router();

router.get("/", controller.getSprints);
router.get("/:sprintId", controller.getSprintById);

router.post("/", controller.addNewSprint);
router.post("/:sprintId", restartSprint)

router.put("/:sprintId", controller.editSprintBySprintId);

router.delete("/:sprintId", controller.removeSprintById);

export default router;