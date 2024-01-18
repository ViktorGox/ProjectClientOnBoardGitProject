import express from "express";
import * as userController from '../controllers/user-controller.js';
import {isLoggedIn, isAdmin} from "../middleware/middlewares.js";

const router = express.Router();
router.get("/",  userController.getAllUsers);
router.get("/allUsernames", userController.getAllUsernames); // TODO: remove? not secure
router.get("/:userid/email", userController.getUsername);
router.get("/:userid", isLoggedIn, isAdmin, userController.getUserById);
router.post("/", isLoggedIn, isAdmin, userController.postUser);
router.put("/:userid/password", isLoggedIn, isAdmin, userController.updateUserPassword);
router.put("/:userid/email", isLoggedIn, isAdmin, userController.updateUserEmail);
router.delete("/:userid", isLoggedIn, isAdmin, userController.deleteUserById);

export default router;