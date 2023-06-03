import { Router } from 'express';
import { deleteArticle, getArticleById, getArticles, postArticle, updateArticle } from './articleController.ts';
import passport from 'passport';
import { validateGetArticles, validateIdParam, validateTransformationOfArticle } from './validationMiddleware.ts';
import confirmValidation from '../middleware/confirmValidation.ts';

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

articleRouter.delete(
  '/:articleId',
  passport.authenticate('jwt', { session: false }),
  validateIdParam,
  confirmValidation,
  deleteArticle
);

//Unprotected routes
articleRouter.get('/', validateGetArticles, confirmValidation, getArticles);

articleRouter.get('/:articleId', validateIdParam, confirmValidation, getArticleById);

export default articleRouter;
