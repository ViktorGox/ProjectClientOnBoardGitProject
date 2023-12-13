import express from "express";
import {doso} from "../controllers/tests-controller.js";

const router = express.Router();

router.get("/", doso);

export default router;