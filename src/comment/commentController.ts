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
  const { authorId, content } = req.body;
  const { commentId } = req.params;
  try {
    const comment = await Comment.findOneAndUpdate({ _id: commentId, authorId }, { content });
    if (!comment) return res.status(404).send('Comment not found');
    return res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { authorId } = req.body;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findOneAndDelete({ authorId, _id: commentId });
    if (!comment) return res.status(404).send('Comment not found');
    return res.status(200).send('Message deleted successfully.');
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
