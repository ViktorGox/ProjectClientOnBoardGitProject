import express from "express";
import {deleteQuery, getQuery, postQuery} from "../controllers/tests-controller.js";

const router = express.Router();

router.get("/", getQuery);
router.delete('/',deleteQuery);
router.post('/', postQuery);

export default router;