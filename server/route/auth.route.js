import express from "express"
import { deleteUser, getAllUsers, loginUser, registerUser, updateUser, upgradeToAdmin } from "../controllers/auth.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";
const auth_router = express.Router();

auth_router.route("/register").post(registerUser);
auth_router.route("/login").post(loginUser);
auth_router.route("/user/admin/:id").put(protect,admin,upgradeToAdmin);
auth_router.route("/user/:id").put(protect,updateUser);
auth_router.route("/user/:id").delete(protect,admin,deleteUser);
auth_router.route("/users").get(protect,admin,getAllUsers)
export default auth_router;
