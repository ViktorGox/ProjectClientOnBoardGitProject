import express from "express";
import * as userController from '../controllers/user-controller.js';
import {isLoggedIn, isAdmin} from "../middleware/middlewares.js";

const router = express.Router();

router.get("/", isLoggedIn, isAdmin, userController.getAllUsers);
router.get("/:id", isLoggedIn, isAdmin, userController.getUserById);
router.post("/", isLoggedIn, isAdmin, userController.postUser);
router.put("/:id", isLoggedIn, isAdmin, userController.updateUser);
router.delete("/:id", isLoggedIn, isAdmin, userController.deleteUserById);

export default router;