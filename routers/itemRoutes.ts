import express from "express";
import { client } from "../server";

export const itemRoutes = express.Router();

//-----------------------------Item Page----------------------------

itemRoutes.get("/item", async (req, res) => {
  let productId: number;
  productId = parseInt(req.query.id as string, 10);
  const product = await client.query(/*sql */ "SELECT * FROM products WHERE id = $1", [productId]);
  res.json(product.rows[0]);
});


// ---------------------------- get want to buy list---------------

itemRoutes.get('/wtblist', async (req, res) => {
  // get product id number from item page
  // console.log(req.query)
  // console.log("itemRoutes")
  let productId: number;
  productId = parseInt(req.query.id as string, 10);
  let condition;
  if (req.query.condition){
    condition = req.query.condition
  } else {
    condition = "Brand New"
  }
  // get the id from wtb list which filter the duplicate and get the latest record (id) from every users.
  const ids = (await client.query(/*sql*/`SELECT users_id, MAX(id) FROM wtb WHERE products_id = ${productId} AND depreciation_rate = ` + "'" + condition + "' GROUP BY users_id")).rows;
  
  // put the id as condition to get the correct wtb list.
  let i = []
  for (const id of ids){
    i.push(id['max'])
  }
  let wtbId = i.join()
  const wtbList = (await client.query(/*sql*/`SELECT depreciation_rate, input_price_buy FROM wtb WHERE id IN (${wtbId}) ORDER BY input_price_buy DESC`) ).rows;
  res.json(wtbList);
})

// ---------------------------- get want to sell list---------------
itemRoutes.get('/wtslist', async (req, res) => {
  let productId: number;
  productId = parseInt(req.query.id as string, 10);
  let condition;
  if (req.query.condition){
    condition = req.query.condition
  } else {
    condition = "Brand New"
  }
  let location;
  if (req.query.location){
     console.log("i'm here")
    if (req.query.location == "ALL"){
      location = ""
    } else {
      location = "AND location = '" + req.query.location + "' "

    }
  } else {
    location = ""
    console.log("i'm hit")
  }
  // get the id from wts list which filter the duplicate and get the latest record (id) from every users.
  const ids = (await client.query(/*sql*/`SELECT users_id, MAX(id) FROM wts WHERE products_id = ${productId} AND is_active = false AND depreciation_rate = ` + "'" + condition + "' GROUP BY users_id")).rows;
  
  // put the id as condition to get the correct wts list.
  let i = []
  for (const id of ids){
    i.push(id['max'])
  }
  let wtsId = i.join()
  const wtsList = (await client.query(/*sql*/`SELECT depreciation_rate, input_price_sell, location FROM wts WHERE id IN (${wtsId}) `+ location + "ORDER BY input_price_sell ASC") ).rows;
  console.log("wtslist at onload")
  console.log(wtsList)
  res.json(wtsList);
})

itemRoutes.get('/transaCtionList', async (req, res) => {
  const record = (await client.query(/*sql*/`SELECT * FROM delivery ORDER BY date DESC LIMIT 5;`)).rows;
  res.json(record);
})
