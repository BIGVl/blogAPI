import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  id: string; // Make sure 'id' property is defined as required
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const schema = new Schema<IUser>({
  username: String,
  password: String,
  firstName: String,
  lastName: String
});

schema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = model<IUser>('User', schema);

export default User;
