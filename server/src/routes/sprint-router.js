import express from 'express';
import * as controller from '../controllers/sprint-controller.js';
import {isAdmin,isDeveloper,isTester,isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router();


router.get("/",isLoggedIn, controller.getSprints);

router.get("/:id",isLoggedIn, controller.getSprintById);

router.post("/", isLoggedIn, isAdmin, controller.addNewSprint);

router.put("/:id", isLoggedIn, isAdmin,isDeveloper, controller.editSprintBySprintId);

router.delete("/:id", isLoggedIn, isAdmin, controller.removeSprintById);


export default router;
