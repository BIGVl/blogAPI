import { Router } from 'express';
import { postComment } from './commentController';
import { validateCommentBody } from './validationMiddleware';
import confirmValidation from '../middleware/confirmValidation';

const commentRouter = Router();

commentRouter.post('/:articleId/comments', validateCommentBody, confirmValidation, postComment);

commentRouter.put('/:articleId/comments/:commentId', validateCommentBody, confirmValidation, postComment);

export default commentRouter;
