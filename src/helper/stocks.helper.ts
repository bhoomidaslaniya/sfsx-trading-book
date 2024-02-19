import db from "../databases/postgres";
class StocksHelper {
  async createStock({ ticker }: { ticker: string }) {
    try {
      const insertQuery = `
        INSERT INTO stocks(ticker)
        VALUES ($1)
        RETURNING ticker_id, ticker;`;

      const result = await db.query(insertQuery, [ticker]);

      return {
        success: true,
        data: {
          ticker,
          ticker_id: result.rows[0].ticker_id,
        },
      };
    } catch (error) {
      console.error("ERROR: ", error);
      return {
        success: false,
        message: "An error occurred while creating ticker",
      };
    }
  }
}
export const stocksHelper = new StocksHelper();
