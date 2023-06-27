import { NextFunction, Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // fail unauthorized
  res.status(401).send("You must log in to continue");
}

export default isAuthenticated;
