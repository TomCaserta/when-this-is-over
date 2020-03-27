import { IUser } from '~/components/user/user.interface';
import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import joi from 'joi';

export interface IUserModel extends IUser {
  hashPassword(): void;
  checkPassword(unencrypted: string): boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true, minlength: 2, maxlength: 5 },
  password: { type: String, required: true }
});

UserSchema.methods.hashPassword = function () {
  this.password = bcrypt.hashSync(this.password, config.get('hash.rounds'));
};

UserSchema.methods.checkPassword = function (unencrypted: string): boolean {
  return bcrypt.compareSync(unencrypted, this.password);
};

export const User: Model<IUserModel> = mongoose.model<IUserModel>('User', UserSchema);

export const validate = (user: IUser) => joi.validate(user, {
  name: joi.string().required(),
  email: joi.string().required().email(),
  country: joi.string().min(2).max(5).required(),
  password: joi.string().required()
});
