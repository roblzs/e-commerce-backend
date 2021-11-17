import express from "express";
import uploadCtrl from "../controllers/uploadController";
import authAdmin from "../middleware/authAdmin";
import uploadImage from "../middleware/uploadImage";

const uploadRouter = express.Router();

uploadRouter.route("/")
    .post(authAdmin, uploadImage, uploadCtrl.upload)

export default uploadRouter;