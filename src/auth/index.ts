import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../user/userModel';
import jwt from 'jsonwebtoken';

const authRouter = Router();

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
