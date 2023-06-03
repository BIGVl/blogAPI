import { NextFunction, Request, Response } from 'express';
import Article from './articleModel';

//Post article
export const postArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, published } = req.body;
  const createdAt = new Date();

  const foundArticle = await Article.findOne({ title });
  if (foundArticle) return res.status(400).json({ message: 'The title of the article is already used.' });

  try {
    const newArticle = new Article({ author: req.user?.id, title, createdAt, content, published, comments: [] });
    await newArticle.save();
    return res.status(200).json({ message: `Article "${title}" successfully created!` });
  } catch (err) {
    return next(err);
  }
};

//PUT/Update article
export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, published } = req.body;
  const { articleId } = req.params;
  const lastUpdate = new Date();
  try {
    await Article.findByIdAndUpdate(articleId, {
      title,
      content,
      published,
      lastUpdate
    });
    return res.status(200).json({ message: `Article ${title} updated with success.` });
  } catch (err) {
    return next(err);
  }
};

//Delete an article
export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
  const { articleId } = req.params;

  try {
    const query = await Article.findByIdAndDelete(articleId);
    console.log(query);
    return res.status(200).json({ message: 'Article deleted .' });
  } catch (err) {
    next(err);
  }
};

//Get all articles and filter, sort, paginate
export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  const { page, pageSize, sort, before, after } = req.query;
  const beforeDate = new Date(before as string);
  const afterDate = new Date(after as string);

  const projection = {
    _id: 1,
    createdAt: 1,
    author: 1,
    title: 1
  };

  const queryArticle = Article.find({}, projection).populate('author', 'firstName lastName');
  if (page && pageSize) {
    const startIndex = (Number(page) - 1) * Number(pageSize);
    queryArticle.skip(startIndex).limit(Number(pageSize));
  }
  if (sort) queryArticle.sort({ createdAt: sort === 'asc' ? 1 : -1 });
  if (before) queryArticle.where('createdAt').gte(Number(beforeDate));
  if (after) queryArticle.where('createdAt').lte(Number(afterDate));
  try {
    const foundArticles = await queryArticle.exec();
    return res.status(200).json({ articles: foundArticles });
  } catch (err) {
    return next(err);
  }
};

//Get one article by it's id
export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  const { articleId } = req.params;
  const article = await Article.findById(articleId).populate('author', 'firstName lastName').populate('comments');

  if (!article) return res.status(404).json({ message: 'Resource not found' });
  return res.status(200).json({ article });
};
