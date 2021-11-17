import express from "express";
import userCtrl from "../controllers/userController";
import authAdmin from "../middleware/authAdmin";

const router = express.Router();

router.route("/")
    .get(authAdmin, userCtrl.getAllUsers)

router.route("/auth/register")
    .post(userCtrl.register)

router.route("/auth/login")
    .post(userCtrl.login)

export default router;