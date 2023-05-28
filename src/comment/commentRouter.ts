import { Router } from 'express';
import { deleteComment, postComment, updateComment } from './commentController';
import { validateCommentBody, validateCommentToDelete } from './validationMiddleware';
import confirmValidation from '../middleware/confirmValidation';

const commentRouter = Router();

commentRouter.post('/:articleId/comments', validateCommentBody, confirmValidation, postComment);

commentRouter.put('/:articleId/comments/:commentId', validateCommentBody, confirmValidation, updateComment);

commentRouter.delete('/:articleId/comments/:commentId', validateCommentToDelete, confirmValidation, deleteComment);

export default commentRouter;
