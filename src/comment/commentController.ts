import { NextFunction, Request, Response } from 'express';
import Comment from './commentModel';
import Article from '../article/articleModel';
import bcrypt from 'bcryptjs';

export const postComment = async (req: Request, res: Response, next: NextFunction) => {
  const { author, content, parentCommentId } = req.body;
  const createdAt = new Date();
  const { articleId } = req.params;

  const comment = new Comment({ author, content, parentComment: parentCommentId, createdAt });

  bcrypt.hash(req.ip, 10, async (err, hashedUser) => {
    if (err) return res.send({ errors: err });

    comment.authorId = hashedUser;
    try {
      const savedComment = await comment.save();
      const article = await Article.findById(articleId);
      article?.comments.push(savedComment._id);
      await article?.save();
      return res.json({ comment });
    } catch (err) {
      next(err);
    }
  });
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const { author, content, parentCommentId } = req.body;
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).send('The user does not exist');
  const id = comment._id.toString();

  bcrypt.compare(req.ip, id, (err, resolved) => {
    if (err) return res.json({ errors: err });
  });

  return res.json({ comment });
};
