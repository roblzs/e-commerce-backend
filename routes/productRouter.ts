import express from "express";
import productCtrl from "../controllers/productController";
import authAdmin from "../middleware/authAdmin";

const uploadRouter = express.Router();

uploadRouter.route("/")
    .get(productCtrl.get)
    .post(authAdmin, productCtrl.create)

uploadRouter.route("/:id")
    .put(authAdmin, productCtrl.update)
    .delete(authAdmin, productCtrl.delete)

export default uploadRouter;