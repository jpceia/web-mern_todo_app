import { Request, Response } from "express";

export const getMe = (req: Request, res: Response) => {
  res.status(200).send(req.user);
}