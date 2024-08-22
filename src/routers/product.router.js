import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { getProducts,setProducts,deleteProduct,updateProduct,getProductByProductId } from "../controllers/products.controller.js";

const router = Router();

router.route("/").get(getProducts);

router.route("/set").post(upload.fields([
    {
        name:"image",
        maxCount:1
    }
]),setProducts);

router.route("/delete").delete(deleteProduct);

router.route("/update").put(updateProduct);

router.route('/:productId').get(getProductByProductId);



export default router;