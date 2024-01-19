import express from "express";
import * as roleController from '../controllers/role-controller.js';
import {isLoggedIn, isAdmin} from "../middleware/middlewares.js";

const router = express.Router();
router.get("/",  roleController.getAllroles);

export default router;
