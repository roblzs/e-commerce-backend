import express from "express";
import userCtrl from "../controllers/userController";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const router = express.Router();

router.route("/access_token")
    .get(userCtrl.getAccessToken)

router.route("/auth/register")
    .post(userCtrl.register)

router.route("/auth/login")
    .post(userCtrl.login)

router.route("/info")
    .get(auth, userCtrl.getUserInfo)
    .put(auth, userCtrl.updateUser)

export default router;