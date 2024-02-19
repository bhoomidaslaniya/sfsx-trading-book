import { Router } from "express";
import { orderController } from "../controller/order.controller";
import { stocksSchema } from "../validation/book.validation";
import { joiValidatorMiddleware } from "../middleware/joi-validator.middleware";
const orderRouter = Router();

orderRouter.post(
  "/orders",
  joiValidatorMiddleware(stocksSchema.orderSchema),
  orderController.createOrder
);

export { orderRouter };
