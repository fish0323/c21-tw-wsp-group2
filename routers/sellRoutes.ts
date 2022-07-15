import express from "express";
import { client } from "../server";

export const sellRoutes = express.Router();


// set a selling price
sellRoutes.post("/sell", async (req, res) => {
    console.log("here is bidRoutes.ts POST/bid", req.body)
    const user_id = req.body.user_id;
    const upload_date = req.body.upload_date;
    const condition = req.body.condition;
    const location = req.body.location;
    const sell_price = req.body.sell_price;
    const is_active = true;
    const product_id = req.body.product_id;

    const setSellingPrice = `INSERT INTO wts (users_id, upload_date, input_price_sell, depreciation_rate, location, is_active, products_id) values ($1,$2,$3,$4,$5,$6,$7)`;
      await client.query(setSellingPrice, [user_id, upload_date, sell_price, condition, location, is_active, product_id]);
      res.status(200).json({ message: "Set sell successfully!" });
});