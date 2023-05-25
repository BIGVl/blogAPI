import { NextFunction, Request, Response } from 'express';

export const postComment = async (req: Request, res: Response, next: NextFunction) => {
  const { author, content } = req.body;
};
