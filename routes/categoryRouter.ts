import express from "express";
import categoryCtrl from "../controllers/categoryController";
import authAdmin from "../middleware/authAdmin";

const router = express.Router();

router.route("/")
    .get(categoryCtrl.get)
    .post(authAdmin, categoryCtrl.create)

router.route("/:id")
    .put(authAdmin, categoryCtrl.update)
    .delete(authAdmin, categoryCtrl.delete)

export default router;