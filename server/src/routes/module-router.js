import express from 'express';
import {getModule, getModuleById} from "../controllers/module-controller.js";

const router = express.Router();

router.get("/", getModule);
router.get('/:moduleid', getModuleById)

export default router;