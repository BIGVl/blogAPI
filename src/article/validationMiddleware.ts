import { NextFunction, Request, Response } from 'express';
import { body, param, query, validationResult } from 'express-validator';

export const validateTransformationOfArticle = [
  body('title', 'Title must be at least 3 characters long.').trim().isLength({ min: 3 }).escape(),
  body('createdAt').trim().exists().escape(),
  body('content', 'The article must be at least 100 characters long.').trim().isLength({ min: 100 }).escape(),
  body('published').trim().exists().escape()
];

export const validateGetArticles = [
  query('page').optional().trim().escape().isInt().withMessage('The page must be a integer.'),
  query('pageSize').optional().trim().escape().isInt().withMessage('The page must be a integer.'),
  query('sort').optional().trim().isIn(['asc', 'desc']).withMessage('Sort must be "asc" or "desc".').escape(),
  query('before').optional().trim().isDate().escape(),
  query('after').optional().trim().isDate().escape()
];

//export const validateIdParam = [param('articleId').isInt().escape()];
