import { Router } from 'express';
import { getArticles, postArticle } from './articleController';
import passport from 'passport';

const articleRouter = Router();

articleRouter.post('/', passport.authenticate('jwt', { session: false }), postArticle);
articleRouter.get('/', getArticles);

export default articleRouter;
