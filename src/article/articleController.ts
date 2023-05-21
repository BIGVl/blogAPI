import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Article from './articleModel';

export const postArticle = [
  body('title', 'Title must be at least 3 characters long.').trim().isLength({ min: 3 }).escape(),
  body('timestamp').trim().exists().escape(),
  body('content', 'The article must be at least 100 characters long.').trim().isLength({ min: 100 }).escape(),
  body('published').trim().exists().escape(),
  async (req: Request, res: Response) => {
    console.log('req.user', req.user);
    const errors = validationResult(req);
    const { title, timestamp, content, published } = req.body;

    if (!errors.isEmpty()) return res.send({ errors: errors.array() });

    const foundArticle = await Article.findOne(title);

    if (foundArticle) return res.send('The title of the article is already in use.');

    try {
      const newArticle = new Article({ author: req.user?.id, title, timestamp, content, published });
      await newArticle.save();
      return res.send(`Article ${title} successfully created!`);
    } catch (err) {
      console.error(err);
      return res.send({ err });
    }
  }
];
