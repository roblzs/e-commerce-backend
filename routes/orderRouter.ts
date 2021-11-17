import express from "express";
import orderCtrl from "../controllers/orderController";
import authAdmin from "../middleware/authAdmin";

const orderRouter = express.Router();

orderRouter.route("/")
    .post(orderCtrl.order)
    .get(authAdmin, orderCtrl.getAll)

orderRouter.route("/:id")
    .get(authAdmin, orderCtrl.getOne)
    .delete(authAdmin, orderCtrl.delete)

export default orderRouter;