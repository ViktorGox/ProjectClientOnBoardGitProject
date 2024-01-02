import express from 'express';
import {getModule, getTestModules} from "../controllers/module-controller.js";

const router = express.Router();

router.get("/", getModule);
router.get("/:testid", getTestModules);

export default router;