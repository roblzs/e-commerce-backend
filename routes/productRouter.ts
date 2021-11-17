import express from "express";
import productCtrl from "../controllers/productController";
import authAdmin from "../middleware/authAdmin";

const productRouter = express.Router();

productRouter.route("/")
    .get(productCtrl.get)
    .post(authAdmin, productCtrl.create)

productRouter.route("/:id")
    .get(productCtrl.getOne)
    .put(authAdmin, productCtrl.update)
    .delete(authAdmin, productCtrl.delete)

export default productRouter;