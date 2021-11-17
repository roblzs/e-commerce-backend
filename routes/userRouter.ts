import express from "express";
import userCtrl from "../controllers/userController";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const userRouter = express.Router();

userRouter.route("/access_token")
    .get(userCtrl.getAccessToken)

userRouter.route("/auth/register")
    .post(userCtrl.register)

userRouter.route("/auth/login")
    .post(userCtrl.login)

userRouter.route("/auth/logout")
    .post(auth, userCtrl.logout)

userRouter.route("/info")
    .get(auth, userCtrl.getUserInfo)
    .put(auth, userCtrl.updateUser)
    
userRouter.route("/admin")
    .get(authAdmin, userCtrl.getAllUsers)

userRouter.route("/admin/:id")
    .put(authAdmin, userCtrl.updateUsersRole)
    .delete(authAdmin, userCtrl.deleteUser)

export default userRouter;