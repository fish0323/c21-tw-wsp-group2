import dotenv from "dotenv";
//import path from "path";
//import xlsx from "xlsx";
import { InsertRow, User } from "./models";
//import { SourceMapRange } from "typescript";
import { hashPassword } from "./hash";
import express from "express";
import expressSession from "express-session";
import pg from 'pg'; 


dotenv.config();

//interface xlsxUserData {
//  username: string;
//  password: string;
//}
//
//interface xlsxMemoData {
//  content: string;
//  image?: string;
//}
//
export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

async function importUser(user: InsertRow<User>) {
  let result = await client.query('select id from "users" where username = $1', [user.username]);

  if (result.rowCount == 0) {
    const hashedPassword = await hashPassword(user.password);

    await client.query(`insert into "users" (username, password) values ($1, $2)`, [
      user.username,
      hashedPassword,
    ]);
  } else {
    //update
    let id = result.rows[0].id;
    await client.query(`update "users" set password = $1, is_admin=$2 where id =$3`, [
      hashPassword,
      id,
    ]);
  }
}


async function main() {
  console.log("[INFOR] start");

  await client.connect();
  console.log("[INFOR] start");

  let sampleUsername = "sample@tecky.io";

  await importUser({
    username: sampleUsername,
    password: "sample",
  });
}


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


app.use((req, res, next) => {
  console.log(`req path: ${req.path}, method: ${req.method}`);
  next();
});




main();

// Route Handlers
//app.use("/memos", memoRoutes);
//app.use(userRoutes);

//export async function importUser() {
//  // let user1: User = { id: 1, username: "dasfsf", password: "adsfads" };
//  // let user2: importUser = { username: "dasfsf", password: "ads" };
//
//  //   -- INSERT INTO users (username, password) VALUES ('jason@tecky.io', '1234'), ('adams@tecky.io', '1234');
//  await dbClient.connect();
//
//  let hash_password = await hashPassword("1234");
//  let result = await dbClient.query(`insert into "users" (username, password) values ($1,$2)`, [
//    "jason@tecky.io",
//    hash_password,
//  ]);
//
//
//  hash_password = await hashPassword("1234");
//  result = await dbClient.query(`insert into "users" (username, password) values ($1,$2)`, [
//    "adams@tecky.io",
//    hash_password,
//  ]);
//
//  await dbClient.end();
//}
//
//importUser();
