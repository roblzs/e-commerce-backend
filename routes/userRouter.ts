import express from "express";
import userCtrl from "../controllers/userController";
import authAdmin from "../middleware/authAdmin";

const router = express.Router();

router.route("/")
    .post(userCtrl.register)
    .get(authAdmin, userCtrl.getAllUsers)