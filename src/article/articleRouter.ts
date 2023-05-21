import { Router } from 'express';
import { postArticle } from './articleController';
import passport from 'passport';

const articleRouter = Router();

articleRouter.post('/', passport.authenticate('jwt', { session: false }), postArticle);

export default articleRouter;
