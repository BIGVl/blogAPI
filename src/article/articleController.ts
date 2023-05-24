import { NextFunction, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import Article from './articleModel';

//Post article
export const postArticle = [
  body('title', 'Title must be at least 3 characters long.').trim().isLength({ min: 3 }).escape(),
  body('createdAt').trim().exists().escape(),
  body('content', 'The article must be at least 100 characters long.').trim().isLength({ min: 100 }).escape(),
  body('published').trim().exists().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('req.user', req.user);
    const { title, createdAt, content, published } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send({ errors: errors.array() });

    const foundArticle = await Article.findOne({ title });

    if (foundArticle) return res.send('The title of the article is already used.');

    try {
      const newArticle = new Article({ author: req.user?.id, title, createdAt, content, published });
      await newArticle.save();
      return res.status(200).send(`Article ${title} successfully created!`);
    } catch (err) {
      return next(err);
    }
  }
];

//PUT/Update article
export const updateArticle = [
  body('title', 'Title must be at least 3 characters long.').trim().isLength({ min: 3 }).escape(),
  body('createdAt').trim().exists().escape(),
  body('content', 'The article must be at least 100 characters long.').trim().isLength({ min: 100 }).escape(),
  body('published').trim().exists().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, createdAt, content, published } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send({ errors: errors.array() });

    try {
      const article = await Article.findByIdAndUpdate(req.params.id, {
        title,
        createdAt,
        content,
        published
      });
      return res.status(200).send(`Article ${article?.title} updated with success.`);
    } catch (err) {
      return next(err);
    }
  }
];

//Get all posts, filter, sort, paginate
export const getArticles = [
  query('page').optional().trim().escape().isInt().withMessage('The page must be a integer.'),
  query('pageSize').optional().trim().escape().isInt().withMessage('The page must be a integer.'),
  query('sort').optional().trim().isIn(['asc', 'desc']).withMessage('Sort must be "asc" or "desc".').escape(),
  query('before').optional().trim().isDate().escape(),
  query('after').optional().trim().isDate().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { page, pageSize, sort, before, after } = req.query;
    const beforeDate = new Date(before as string);
    const afterDate = new Date(after as string);

    const queryArticle = Article.find().populate('author', 'firstName lastName');
    if (page && pageSize) {
      const startIndex = (Number(page) - 1) * Number(pageSize);
      queryArticle.skip(startIndex).limit(Number(pageSize));
    }
    if (sort) queryArticle.sort({ createdAt: sort === 'asc' ? 1 : -1 });
    if (before) queryArticle.where('createdAt').gte(Number(beforeDate));
    if (after) queryArticle.where('createdAt').lte(Number(afterDate));
    try {
      const findArticles = await queryArticle.exec();
      return res.status(200).json({ articles: findArticles });
    } catch (err) {
      return next(err);
    }
  }
];
