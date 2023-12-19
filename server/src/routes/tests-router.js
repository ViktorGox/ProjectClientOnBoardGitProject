import express from "express";
import {deleteQuery, getQuery, postQuery, putQuery} from "../controllers/tests-controller.js";

const router = express.Router();

router.get("/", getQuery);
router.delete('/',deleteQuery);
router.post('/', postQuery);
router.put('/', putQuery) //TODO: should be patch, and all other puts.

export default router;