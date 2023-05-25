import { Router } from 'express';
import { deleteArticle, getArticleById, getArticles, postArticle, updateArticle } from './articleController';
import passport from 'passport';
import { confirmValidation, validateGetArticles, validateTransformationOfArticle } from './validationMiddleware';

const articleRouter = Router();

//Protected routes
articleRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validateTransformationOfArticle,
  confirmValidation,
  postArticle
);
articleRouter.put(
  '/:articleId',
  passport.authenticate('jwt', { session: false }),
  validateTransformationOfArticle,
  confirmValidation,
  updateArticle
);

articleRouter.delete('/:articleId', passport.authenticate('jwt', { session: false }), deleteArticle);

//Unprotected routes
articleRouter.get('/', validateGetArticles, confirmValidation, getArticles);

articleRouter.get('/:articleId', getArticleById);

export default articleRouter;
