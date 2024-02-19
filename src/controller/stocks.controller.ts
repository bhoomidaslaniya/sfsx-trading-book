import { Response } from "express";
import {
  ExtendedRequest,
  NextFunctionInterface,
} from "../interfaces/server.interface";
import { stocksService } from "../service/stocks.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/server-responses.util";

class StocksController {
  async createStock(
    req: ExtendedRequest,
    res: Response,
    next: NextFunctionInterface
  ) {
    try {
      const { ticker } = req.body;
      const result = await stocksService.createStock(ticker);

      if (result.success) {
        sendSuccessResponse(res, result, 201);
      } else {
        sendErrorResponse(res, result, 500);
      }
    } catch (error) {
      console.error("ERROR: ", error);
      next(error);
    }
  }
}
export const stocksController = new StocksController();
