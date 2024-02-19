import { Response } from "express";
import {
  ExtendedRequest,
  NextFunctionInterface,
} from "../interfaces/server.interface";
import { orderService } from "../service/order.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/server-responses.util";

class OrderController {
  async createOrder(
    req: ExtendedRequest,
    res: Response,
    next: NextFunctionInterface
  ) {
    try {
      const { ticker_id, trader, side, price, number_of_shares } = req.body;
      const result = await orderService.createOrder(
        ticker_id,
        trader,
        side,
        price,
        number_of_shares
      );

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
export const orderController = new OrderController();
