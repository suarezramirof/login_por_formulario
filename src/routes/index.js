import { Router } from "express";
import loginRouter from "./loginRouter.js";
import productsRouter from "./productsRouter.js";

const router = Router();
router.use("/api", productsRouter);
router.use("/", loginRouter);

export default router;