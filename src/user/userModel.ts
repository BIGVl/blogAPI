import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
});

schema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = model('User', schema);

export default User;
