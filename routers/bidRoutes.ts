import express from "express";
import { client } from "../server";

export const bidRoutes = express.Router();

// place bid
bidRoutes.post("/bid", async (req, res) => {
  console.log("here is bidRoutes.ts POST/bid", req.body);
  const user_id = req.body.user_id;
  const upload_date = req.body.upload_date;
  const condition = req.body.condition;
  const bid_price = req.body.bid_price;
  const product_id = req.body.product_id;

  const setBidPrice = `INSERT INTO wtb (users_id, upload_date, input_price_buy, depreciation_rate, products_id) values ($1,$2,$3,$4,$5)`;
  await client.query(setBidPrice, [user_id, upload_date, bid_price, condition, product_id]);
  res.status(200).json({ message: "Place bid successfully!" });
});

bidRoutes.get("/bid", async (req, res) => {
  // latest
  const bidRecordArr = (await client.query(`SELECT * FROM wtb`)).rows;
  console.log("bidArr", bidRecordArr);
  console.log(bidRecordArr.length);
  const latestIndex = bidRecordArr.length - 1;
  console.log("latest bid:", bidRecordArr[latestIndex]);
  // res.status(200).json({ message: "Place bid successfully!" });
});
