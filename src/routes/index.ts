import { Router } from "express";
import { orderRouter } from "./order.routes";
import { stocksRouter } from "./stocks.routes";

const router = Router();
router.use("/book", orderRouter);
router.use("/book", stocksRouter);

export { router };
