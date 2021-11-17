import express from "express";
import userCtrl from "../controllers/userController";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const router = express.Router();

router.route("/")
    .get(userCtrl.getAccessToken)

router.route("/auth/register")
    .post(userCtrl.register)

router.route("/auth/login")
    .post(userCtrl.login)

export default router;