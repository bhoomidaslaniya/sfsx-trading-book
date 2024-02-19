import { Router } from "express";
import { stocksController } from "../controller/stocks.controller";
import { stocksSchema } from "../validation/book.validation";
import { joiValidatorMiddleware } from "../middleware/joi-validator.middleware";
const stocksRouter = Router();

stocksRouter.post(
  "/ticker",
  joiValidatorMiddleware(stocksSchema.stockSchema),
  stocksController.createStock
);

export { stocksRouter };
