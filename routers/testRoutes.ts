import express from "express";

export const testRoutes = express.Router();

testRoutes.get("/products", (req, res) => {
  res.json("test route");
});

testRoutes.use("/", (req, res) => {
  res.json("test route use");
});
