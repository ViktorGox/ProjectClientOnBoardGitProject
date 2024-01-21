import express from "express";
import * as userController from '../controllers/user-controller.js';
import {isLoggedIn, isAdmin} from "../middleware/middlewares.js";
import {editUserByUserId} from "../controllers/user-controller.js";

const router = express.Router();
router.get("/",  userController.getAllUsers);
router.get("/mappedRoles", userController.getUsersMappedRoles)
router.get("/allUsernames", userController.getAllUsernames); // TODO: remove? not secure
router.get("/:userid/email", userController.getUsername);
router.get("/:userid", userController.getUserById);
router.post("/",  userController.postUser);
router.put("/:userid",  userController.editUserByUserId);
router.put("/:userid/password",   userController.updateUserPassword);
router.put("/:userid/email",   userController.updateUserEmail);
router.delete("/:userid",  userController.deleteUserById);

export default router;
