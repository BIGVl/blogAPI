import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const confirmValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.send({ errors: errors.array() });

  next();
};

export default confirmValidation;
