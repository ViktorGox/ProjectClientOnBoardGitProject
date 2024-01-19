import express from "express";
import {deleteQuery, getQuery, getTestStepById, postQuery, putQuery} from "../controllers/teststep-controller.js";
import fileRouter from "./file-router.js";

const router = express.Router({mergeParams:true});

router.use('/:stepid/attachment', fileRouter);

router.get('/', getQuery);
router.get('/:stepid', getTestStepById);

//Middleware doesnt work yet
router.put('/:stepid'/*,isDeveloper()*/,putQuery);
router.delete('/:stepid',/*isDeveloper(),*/deleteQuery);
router.post('/:stepid',/*isDeveloper(),*/postQuery);
export default router;