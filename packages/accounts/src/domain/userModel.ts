import { Document, Schema, Model, model } from 'mongoose';
import mongooseLeanId from 'mongoose-lean-id';

export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface User {
  id?: any;
  name?: string;
  age?: number;
  email?: string;
  image?: string;
  phone?: string;
  company?: string;
  password?: string;
  //  address: Address;
}

export interface UserDoc extends User, Document {}

export var UserSchema: Schema = new Schema({
  name: String,
  email: String,
  image: String,
  phone: String,
  company: String,
  password: String,
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.plugin(mongooseLeanId);

export type UserModelType = Model<UserDoc>;
export const UserModel: UserModelType = model<UserDoc>('User', UserSchema);
