import { Request, Response, Router } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../user/userModel';

const authRouter = Router();

//POST Sign up user
authRouter.post('/signup', [
  body('username', 'The username needs to be between 3-16 characters and alphanumeric only.')
    .trim()
    .isAlphanumeric()
    .isLength({ min: 3, max: 16 })
    .escape(),
  body('password').trim().isAlphanumeric().isLength({ min: 8, max: 32 }).escape(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { username, passsword } = req.body;
    console.log(errors);
    if (!errors.isEmpty()) return res.send({ errors: errors.array() });

    const user = new User({
      username,
      password: ''
    });

    const existingUser = await User.find({ username });
    console.log(existingUser);

    if (existingUser) return res.send('Username already in use.');

    bcrypt.hash(passsword, 10, async (err, hashedPass) => {
      if (err) return res.send({ msg: 'Error occured during password hashing', err });
      user.password = hashedPass;
      await user.save();
      return res.send('You entered the correct format');
    });
  }
]);

export default authRouter;
