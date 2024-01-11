import express from "express";
import tokenRouter from "./token-router.js";
import {deleteQuery, getQuery, getTestStepById, postQuery, putQuery} from "../controllers/teststep-controller.js";
import {isDeveloper} from "../middleware/middlewares.js";

const router = express.Router();


router.get('/', getQuery);
router.get('/:stepid', getTestStepById);

//Middleware doesnt work yet
router.put('/:stepid'/*,isDeveloper()*/,putQuery);
router.delete('/:stepid',/*isDeveloper(),*/deleteQuery);
router.post('/:stepid',/*isDeveloper(),*/postQuery);
export default router;