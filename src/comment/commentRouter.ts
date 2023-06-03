import { Router } from 'express';
import { deleteComment, postComment, updateComment } from './commentController.ts';
import { validateCommentBody, validateCommentToDelete } from './validationMiddleware.ts';
import confirmValidation from '../middleware/confirmValidation.ts';

const commentRouter = Router();

commentRouter.post('/:articleId/comments', validateCommentBody, confirmValidation, postComment);

commentRouter.put('/:articleId/comments/:commentId', validateCommentBody, confirmValidation, updateComment);

commentRouter.delete('/:articleId/comments/:commentId', validateCommentToDelete, confirmValidation, deleteComment);

export default commentRouter;
