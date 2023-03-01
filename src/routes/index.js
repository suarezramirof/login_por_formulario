import { Router } from "express";
import loginRouter, { checkAuthenticated } from "./loginRouter.js";
import productsRouter from "./productsRouter.js";

const router = Router();
router.use("/api", checkAuthenticated, productsRouter);
router.use("/", loginRouter);
export default router;