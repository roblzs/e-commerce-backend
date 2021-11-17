import express from "express";
import categoryCtrl from "../controllers/categoryController";
import authAdmin from "../middleware/authAdmin";

const categoryRouter = express.Router();

categoryRouter.route("/")
    .get(categoryCtrl.get)
    .post(authAdmin, categoryCtrl.create)

categoryRouter.route("/:id")
    .put(authAdmin, categoryCtrl.update)
    .delete(authAdmin, categoryCtrl.delete)

export default categoryRouter;