import express from "express";
import { client } from "../server";

export const productRoutes = express.Router();

// ------------------------ index page ------------------------ Fish
// get all products
productRoutes.get("/products", async (req, res) => {
  // console.log("user",req.session["user"])
  const products = (await client.query(/*sql */ `SELECT * FROM products`)).rows;
  res.json(products);
});

// ------------------------ index page ------------------------ Samuel
// sorting
productRoutes.post("/sort", async (req, res) => {
  const { arr } = req.body;
  // console.log(arr[0])
  let addCondition = "";

  // if any checkbox (excluded "ALL") is checked
  if (arr[0]) {
    let productType = "";
    let consoleType = "";
    let price = "";
    let highLow = [0, 0];

    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case "ps5":
        case "ps4":
        case "xbox":
        case "nswitch":
          if (consoleType == "") {
            consoleType += `console_by IN ('${arr[i]}')`;
          } else {
            let x = consoleType.split("");
            x.pop();
            // x.pop()
            consoleType = x.join("") + `, '${arr[i]}')`;
          }
          break;

        case "gameconsole":
        case "videogames":
          productType = `type = '${arr[i]}'`;
          break;

        case "low":
          highLow[0] = 0;
          if (arr.includes("secondlow") || arr.includes("normal") || arr.includes("high")) {
          } else {
            highLow[1] = 299;
          }
          price = `suggest_price BETWEEN ${highLow[0]} AND ${highLow[1]}`;
          break;
        case "secondlow":
          if (arr.includes("low")) {
          } else {
            highLow[0] = 300;
          }
          if (arr.includes("normal") || arr.includes("high")) {
          } else {
            highLow[1] = 599;
          }
          price = `suggest_price BETWEEN ${highLow[0]} AND ${highLow[1]}`;
          break;
        case "normal":
          if (arr.includes("low") || arr.includes("secondlow")) {
          } else {
            highLow[0] = 600;
          }
          if (arr.includes("high")) {
          } else {
            highLow[1] = 2999;
          }
          price = `suggest_price BETWEEN ${highLow[0]} AND ${highLow[1]}`;
          break;
        case "high":
          if (arr.includes("low") || arr.includes("secondlow") || arr.includes("normal")) {
          } else {
            highLow[0] = 3000;
          }
          highLow[1] = 100000;
          price = `suggest_price BETWEEN ${highLow[0]} AND ${highLow[1]}`;
          break;

        default:
        // console.log("Error error")
      }
    }
    if ((consoleType != "" || price != "") && productType != "") {
      productType = productType + " AND ";
    }
    if (consoleType != "" && price != "") {
      consoleType = consoleType + " AND ";
    }
    console.log("consoleType:" + consoleType);
    // console.log("productType:" + productType)
    // console.log('price:' + price)

    addCondition = `WHERE ${productType}${consoleType}${price}`;
    console.log(addCondition);
  }
  const products = (await client.query(/*sql */ `SELECT * FROM products ${addCondition};`)).rows;
  res.json(products);
});
