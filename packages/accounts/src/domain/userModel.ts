import { Document, Schema, Model, model } from 'mongoose';

export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface User {
  name?: string;
  age?: number;
  email?: string;
  image?: string;
  phone?: string;
  company?: string;
  //  address: Address;
}

export interface UserDoc extends User, Document {}

export var UserSchema: Schema = new Schema({
  name: String,
  email: String,
  image: String,
  phone: String,
  company: String,
});

export type UserModelType = Model<UserDoc>;
export const UserModel: UserModelType = model<UserDoc>('User', UserSchema);
