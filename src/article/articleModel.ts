import { Schema, model } from 'mongoose';

const schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  createdAt: Date,
  content: String,
  published: Boolean,
  lastUpdate: Date
});

const Article = model('Article', schema);

export default Article;
