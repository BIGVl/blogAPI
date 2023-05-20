import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../user/userModel';
import jwt from 'jsonwebtoken';

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
      try {
        await user.save();
        const SECRET = process.env.SECRET || 'randomSecret';
        const token = jwt.sign(username, SECRET);
        return res.send('You entered the correct format');
      } catch (err) {
        return res.status(500).json({ error: err, msg: 'Internal error.' });
      }
    });
  }
]);

export default authRouter;
