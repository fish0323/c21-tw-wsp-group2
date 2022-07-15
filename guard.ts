import { Request, Response, NextFunction } from "express";

export function isLoggedin(req: Request, res: Response, next: NextFunction) {
  if (req.session["user"]) {
    //logged in!
    console.log("Hi I am guard", req.session["user"]);
    next();
  } else {
    //not logged in
    res.redirect("/new-login.html");
    // res.status(400).json({ message: "No Auth" });
  }
}
