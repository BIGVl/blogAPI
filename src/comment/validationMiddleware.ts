import { body, param } from 'express-validator';

export const validateCommentBody = [
  body('author', 'The name cannot be longer than 20 characters').trim().isLength({ min: 2, max: 20 }).escape(),
  param('commentId').trim().escape(),
  body('content', 'The content needs to be between 3 to 2000 characters long').trim().isLength({ min: 3, max: 2000 }).escape(),
  body('parentComment').optional().trim().escape()
];

export const validateCommentToDelete = [
  body('authorId', 'The authorId is required').exists().escape(),
  param('commentId', 'The id of the comment is missing').exists().escape()
];
