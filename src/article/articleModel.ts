import { Schema, model } from 'mongoose';

const schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  timestamp: Date,
  content: String,
  published: Boolean
});

const Article = model('Article', schema);

export default Article;
