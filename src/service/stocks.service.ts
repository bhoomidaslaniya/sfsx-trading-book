import { log } from "console";
import { stocksHelper } from "../helper/stocks.helper";

class StocksService {
  async createStock(ticker: any) {
    try {
      const createdTicker = await stocksHelper.createStock({
        ticker,
      });

      if (createdTicker.success) {
        return {
          isError: false,
          success: true,
          data: {
            ticker: createdTicker.data?.ticker,
            ticker_id: createdTicker.data?.ticker_id,
          },
          message: "Tickers created successfully",
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
        message: "An error occurred while creating the tickers",
      };
    }
  }
}
export const stocksService = new StocksService();
