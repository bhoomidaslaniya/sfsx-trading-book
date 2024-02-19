import { log } from "console";
import { orderHelper } from "../helper/order.helper";

class OrderService {
  async createOrder(
    ticker_id: any,
    trader: any,
    side: any,
    price: any,
    number_of_shares: any
  ) {
    try {
      const createdTicker = await orderHelper.createOrder({
        ticker_id,
        trader,
        side,
        price,
        number_of_shares,
      });
      if (createdTicker.success) {
        return {
          isError: false,
          success: true,
          data: {
            ticker_id: createdTicker.data?.ticker_id,
            trader: createdTicker.data?.trader,
            side: createdTicker.data?.side,
            price: createdTicker.data?.price,
            number_of_shares: createdTicker.data?.number_of_shares,
            order_id: createdTicker.data?.order_id,
          },
          message: "Orders created successfully",
        };
      } else {
        return {
          isError: true,
          success: false,
          message: createdTicker.message,
        };
      }
    } catch (error) {
      console.error("ERROR: ", error);
      return {
        isError: true,
        success: false,
        message: "An error occurred while creating the orders",
      };
    }
  }
}
export const orderService = new OrderService();
