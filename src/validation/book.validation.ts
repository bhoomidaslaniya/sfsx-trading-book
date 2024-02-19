import Joi from "joi";
export const stocksSchema = {
  stockSchema: Joi.object({
    body: Joi.object({
      ticker: Joi.string().valid("GOOG", "FB", "ORCL", "CLOUDNT").required(),
    }).required(),
  }).unknown(),

  orderSchema: Joi.object({
    body: Joi.object({
      ticker_id: Joi.string().required(),
      trader: Joi.string().required(),
      side: Joi.string().valid("buy", "sell").required(),
      price: Joi.number().precision(10).required(),
      number_of_shares: Joi.number().integer().required(),
    }).required(),
  }).unknown(),
};
