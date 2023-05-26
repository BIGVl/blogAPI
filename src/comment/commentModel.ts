import { Schema, model } from 'mongoose';

const schema = new Schema({
  author: String,
  authorId: String,
  createdAt: Date,
  content: String,
  //We create the properties parentComment and children so each comment can be also commented on
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  }
});

const Comment = model('Comment', schema);

export default Comment;
