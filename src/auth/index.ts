import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../user/userModel';

const authRouter = Router();

authRouter.post('/signup', [
  body('username', 'The username needs to be between 3-16 characters and alphanumeric only.')
    .trim()
    .isAlphanumeric()
    .isLength({ min: 3, max: 16 })
    .escape(),
  body('password').trim().isAlphanumeric().isLength({ min: 8, max: 32 }).escape(),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { username, passsword } = req.body;
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    const user = new User({
      username,
      password: ''
    });

    const hash = process.env.HASH || 'bacon';
    bcrypt.hash(hash, 10, async (err, hashedPass) => {
      if (err) return res.send({ msg: 'Error occured during password hashing', err });
      user.password = hashedPass;
      await user.save();
    });

    return res.send('You entered the correct format ');
  }
]);

export default authRouter;
