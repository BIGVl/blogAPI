import { Document } from 'mongoose';
import { Schema, model } from 'mongoose';

interface IUser extends Document {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: number;
}

const schema = new Schema<IUser>({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  isAdmin: Number
});

schema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = model<IUser>('User', schema);

export default User;
