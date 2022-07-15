import express from "express";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";
import expressSession from "express-session";
import { itemRoutes } from "./routers/itemRoutes";
import { productRoutes } from "./routers/productRoutes";
import { userRoutes } from "./routers/UserRoutes";
import { bidRoutes } from "./routers/bidRoutes";
import { sellRoutes } from "./routers/sellRoutes";
import { isLoggedin } from "./guard";
// import { testRoutes } from "./routers/testRoutes";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    secret: "XXXXXXXX",
    resave: true,
    saveUninitialized: true,
  })
);

export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
client.connect();

app.use(userRoutes);
app.use(productRoutes);
app.use(itemRoutes);

// app.use(bidRoutes);

app.use("/bid.html", isLoggedin, bidRoutes);
app.use("/sell.html", isLoggedin, sellRoutes);
app.use("/transaction.html", isLoggedin);
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressSession({
    secret: "XXXXXXXX",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
// app.use("/userprofile", isLoggedin, express.static("private"));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});
