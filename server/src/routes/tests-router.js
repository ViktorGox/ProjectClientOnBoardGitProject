import express from "express";
import {getQuery} from "../controllers/tests-controller.js";

const router = express.Router();

router.get("/", getQuery);

export default router;