import express from "express";
import { client } from "../server";
export const userRoutes = express.Router();
// getcurrentUser
userRoutes.get("/currentUser", (req, res) => {
  if (req.session["user"]) {
    res.status(200).json(req.session["user"]);
  } else {
    res.json({ success: false });
  }
});

//Login Form
userRoutes.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log("userRoutes POST/login", email, password);
    const foundUser = (
      await client.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [
        email,
        password,
      ])
    ).rows[0];
    if (!foundUser) {
      res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });

      return;
    }
    req.session["user"] = {
      id: foundUser.id,
      username: foundUser.name,
      email: foundUser.email,
    };
    console.log("userRoutes POST/login", req.session["user"]);
    res.status(200).json({ message: "Login Success" });
  } catch (error) {
    console.log(error);
  }
});

// res.status(400).json({
//   success: false,
//   message: "Incorrect account or password",
// });
userRoutes.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //check not null & empty
    if (name != "" && email != "" && password != "") {
      //username already exist
      const checkName = (await client.query(`SELECT * FROM users WHERE name = $1`, [name])).rows[0];
      if (checkName) {
        res.status(400).json({
          success: false,
          message: "username already exist",
        });
        return;
      }
      //email already exist
      const checkEmail = (await client.query(`SELECT * FROM users WHERE email = $1`, [email]))
        .rows[0];
      if (checkEmail) {
        res.status(400).json({
          success: false,
          message: "email already exist",
        });
        return;
      }
      //   const hashedpassword = await hashPassword(password);
      const createUserSql = `INSERT INTO users (password, name, email, created_at) values ($1,$2,$3,$4)`;
      await client.query(createUserSql, [password, name, email, `NOW()`]);
      res.status(200).json({ message: "Created Account" });
    }
  } catch (error) {
    console.log(error);
  }
});

userRoutes.get("/logout", (req, res) => {
  if (req.session["user"]) {
    req.session["user"] = null;
    console.log("Yes it is fun");
    console.log(req.session["user"]);
    res.json(req.session["user"]);
  } else {
    res.json({ success: false });
  }
  // res.redirect('/helpCenter.html')
  // req.session["user"] = undefined;
  // req.session.save();
  // console.log("logout", req.session["user"]);
  // res.status(400).json({message: "logged out"});
});
