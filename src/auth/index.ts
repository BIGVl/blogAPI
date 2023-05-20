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
    const { username, password } = req.body;
    console.log(errors);
    if (!errors.isEmpty()) return res.send({ errors: errors.array() });

    const user = new User({
      username,
      password: ''
    });

    const existingUser = await User.findOne({ username });
    console.log(existingUser);

    if (existingUser) return res.send('Username already in use.');

    bcrypt.hash(password, 10, async (err, hashedPass) => {
      if (err) return res.send({ msg: 'Error occured during password hashing', err });
      user.password = hashedPass;
      try {
        await user.save();
        delete user.password;
        const SECRET = process.env.SECRET || 'randomSecret';
        const token = jwt.sign(user, SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.redirect('/admin/create-article');
      } catch (err) {
        return res.status(500).json({ error: err, msg: 'Internal error.' });
      }
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
  body('password').trim().isAlphanumeric().isLength({ min: 8, max: 32 }).escape(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { username, password } = req.body;

    //If validation does not passs
    if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() });

    //The user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(400).send({ error: 'The user does not exist.' });

    const SECRET = process.env.SECRET || 'randomSecret';
    bcrypt.compare(password, existingUser.password as string, function (error, resolved) {
      if (!resolved) return res.status(400).send({ error: 'The username or password is incorrect.' });

      try {
        const token = jwt.sign(existingUser, SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true });
        return res.redirect('/admin/create-article');
      } catch (err) {
        return res.status(500).json({ error: error, msg: 'Internal server error.' });
      }
    });
  }
]);

export default authRouter;
