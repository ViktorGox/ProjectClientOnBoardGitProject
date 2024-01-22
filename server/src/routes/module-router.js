import express from 'express';
import {deleteModuleById, editModule, getModule, getModuleById, postModule} from "../controllers/module-controller.js";

const router = express.Router();

router.get("/", getModule);
router.get('/:moduleid', getModuleById)
router.post("/", postModule);
router.delete("/:moduleid", deleteModuleById);
router.put("/:moduleid", editModule);

export default router;