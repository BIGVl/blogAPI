import { NextFunction, Request, Response } from 'express';
import Article from './articleModel';

//Post article
export const postArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { title, createdAt, content, published } = req.body;

  const foundArticle = await Article.findOne({ title });
  if (foundArticle) return res.send('The title of the article is already used.');

  try {
    const newArticle = new Article({ author: req.user?.id, title, createdAt, content, published });
    await newArticle.save();
    return res.status(200).send(`Article "${title}" successfully created!`);
  } catch (err) {
    return next(err);
  }
};

//PUT/Update article
export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { title, createdAt, content, published } = req.body;

  try {
    await Article.findByIdAndUpdate(req.params.id, {
      title,
      createdAt,
      content,
      published
    });
    return res.status(200).send(`Article "${title}" updated with success.`);
  } catch (err) {
    return next(err);
  }
};

//Delete an article
export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {};

//Get all posts, filter, sort, paginate
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
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
};
