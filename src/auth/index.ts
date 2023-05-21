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
  body('password')
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage('The password needs to be at least 8 characters long.')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_\-+=])[A-Za-z0-9!@#$%^&*()_\-+=]+$/)
    .withMessage(
      'The password needs to contain at least 1 upppercase letter, 1 lowercase letter, 1 number and 1 special character.'
    )
    .escape(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { username, password } = req.body;

    if (!errors.isEmpty()) return res.send({ errors: errors.array() });

    const user = new User({
      username,
      password: ''
    });

    const existingUser = await User.findOne({ username });

    if (existingUser) return res.send('Username already in use.');

    bcrypt.hash(password, 10, async (err, hashedPass) => {
      if (err) return res.send({ msg: 'Error occured during password hashing', err });
      user.password = hashedPass;
      await user.save();

      const SECRET = process.env.SECRET || 'secret';
      const token = jwt.sign({ username, id: user._id }, SECRET, { expiresIn: '1h' });

      res.cookie('jwt', token, { httpOnly: true, secure: true });
      return res.send({ msg: 'User created', token });
    });
  }
]);

//POST Login
authRouter.post('/login', [
  body('username', 'The username needs to be between 3-16 characters and alphanumeric only.')
    .trim()
    .isAlphanumeric()
    .isLength({ min: 3, max: 16 })
    .escape(),
  body('password', 'The password needs to be at least 8 characters long.').trim().isLength({ min: 8, max: 32 }).escape(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { username, password } = req.body;

    //If validation does not passs
    if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() });

    //The user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send({ error: 'The user does not exist.' });

    bcrypt.compare(password, user.password as string, function (error, resolved) {
      if (error) return;
      if (!resolved) return res.status(400).send({ error: 'The username or password is incorrect.' });

      const SECRET = process.env.SECRET || 'secret';
      const token = jwt.sign({ username, id: user._id }, SECRET, { expiresIn: '1h' });
      const decoded = jwt.decode(token);
      res.cookie('jwt', token, { httpOnly: true });
      return res.send({ msg: 'You are logged in .', token });
    });
  }
]);

export default authRouter;
