import { Schema, model, models } from 'mongoose';

import bcrypt from 'bcryptjs';

interface IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  postData?: string;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  postData: String,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async (
  candPass: string,
  userPass: string,
) => await bcrypt.compare(candPass, userPass);

const UserModel = models.User || model<IUser>('User', userSchema);

export default UserModel;
