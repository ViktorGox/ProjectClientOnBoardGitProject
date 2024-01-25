import express from 'express';
import {
    deleteModuleById,
    editLabel,
    editModule,
    getModule,
    getModuleById,
    postModule
} from "../controllers/module-controller.js";

const router = express.Router({mergeParams:true});

router.get("/", getModule);
router.get('/:moduleid', getModuleById)
router.post("/", postModule);
router.delete("/:moduleid", deleteModuleById);
router.put("/:moduleid", editModule);
router.patch("/label/:moduleid", editLabel);

export default router;