import db from "../databases/postgres";
class OrderHelper {
  async createOrder({
    ticker_id,
    trader,
    side,
    price,
    number_of_shares,
  }: {
    ticker_id: any;
    trader: any;
    side: any;
    price: any;
    number_of_shares: any;
  }) {
    try {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const insertQuery = `
      INSERT INTO Orders(ticker_id, trader, side, price, number_of_shares, Time)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING order_id, ticker_id, Time, side, trader, price, number_of_shares, status`;

      const result = await db.query(insertQuery, [
        ticker_id,
        trader,
        side,
        price,
        number_of_shares,
        currentTime,
      ]);

      if (side === "sell") {
        const updateQuery = `
          UPDATE Orders
          SET status = 'executed'
          WHERE ticker_id = $1
            AND side = 'buy'
            AND price >= $2
          RETURNING order_id, ticker_id, Time, side, trader, price, number_of_shares, status`;

        const updateResult = await db.query(updateQuery, [ticker_id, price]);

        if (updateResult.rows.length > 0) {
          const matchedShares = Math.min(
            number_of_shares,
            updateResult.rows[0].number_of_shares
          );
          const remainingShares = number_of_shares - matchedShares;

          const updateSellQuery = `
            UPDATE Orders
            SET status = 'executed'
            WHERE order_id = $1
            RETURNING order_id, ticker_id, Time, side, trader, price, number_of_shares, status`;

          const updateSellResult = await db.query(updateSellQuery, [
            result.rows[0].order_id,
          ]);

          if (remainingShares > 0) {
            const insertRemainingQuery = `
              INSERT INTO Orders(ticker_id, trader, side, price, number_of_shares, Time, status)
              VALUES ($1, $2, $3, $4, $5, $6, 'pending')
              RETURNING order_id, ticker_id, Time, side, trader, price, number_of_shares, status`;

            const insertRemainingResult = await db.query(insertRemainingQuery, [
              ticker_id,
              trader,
              side,
              price,
              remainingShares,
              currentTime,
            ]);

            return {
              success: true,
              data: {
                ticker_id,
                trader,
                side,
                price,
                number_of_shares,
                matched_order_id: updateSellResult.rows[0].order_id,
                remaining_order_id: insertRemainingResult.rows[0].order_id,
                Time: currentTime,
                status: "executed",
              },
            };
          }

          return {
            success: true,
            data: {
              ticker_id,
              trader,
              side,
              price,
              number_of_shares,
              order_id: updateSellResult.rows[0].order_id,
              Time: currentTime,
              status: "executed",
            },
          };
        }
      }

      const checkPendingSellQuery = `
        SELECT *
        FROM Orders
        WHERE ticker_id = $1
          AND (side = 'buy' OR side = 'sell')
          AND status = 'pending'
      `;

      const pendingSellOrders = await db.query(checkPendingSellQuery, [
        ticker_id,
      ]);

      if (pendingSellOrders.rows.length > 0) {
        const newBuyPrice = price;

        for (const pendingOrder of pendingSellOrders.rows) {
          if (newBuyPrice >= pendingOrder.price) {
            const executePendingSellQuery = `
              UPDATE Orders
              SET status = 'executed'
              WHERE order_id = $1
              RETURNING order_id, ticker_id, Time, side, trader, price, number_of_shares, status`;

            const executePendingSellResult = await db.query(
              executePendingSellQuery,
              [pendingOrder.order_id]
            );

            const updateBuyQuery = `
        UPDATE Orders
        SET status = 'executed'
        WHERE order_id = $1
        RETURNING order_id, ticker_id, Time, side, trader, price, number_of_shares, status`;

            const updateBuyResult = await db.query(updateBuyQuery, [
              result.rows[0].order_id,
            ]);
            return {
              success: true,
              data: {},
            };
          } else if (number_of_shares < pendingOrder.number_of_shares) {
            return {
              success: true,
              data: {},
            };
          }
        }
      }
      return {
        success: true,
        data: {
          ticker_id,
          trader,
          side,
          price,
          number_of_shares,
          order_id: result.rows[0].order_id,
          Time: currentTime,
        },
      };
    } catch (error) {
      console.error("ERROR: ", error);
      return {
        success: false,
        message: "An error occurred while creating/updating the order",
      };
    }
  }
}

export const orderHelper = new OrderHelper();
