import { Router } from 'express';
import { getArticles, postArticle, updateArticle } from './articleController';
import passport from 'passport';
import { confirmValidation, validateGetArticles, validateTransformationOfArticle } from './validationMiddleware';

const articleRouter = Router();

articleRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validateTransformationOfArticle,
  confirmValidation,
  postArticle
);
articleRouter.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  validateTransformationOfArticle,
  confirmValidation,
  updateArticle
);
articleRouter.get('/', validateGetArticles, confirmValidation, getArticles);

export default articleRouter;
