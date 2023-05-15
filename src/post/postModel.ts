import { Schema, model } from 'mongoose';

const schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  timestamp: Date,
  content: String
});

const Post = model('Post', schema);

export default Post;
