// import mongoose from 'mongoose';
import { MongooseDataSource } from './mongooseDataSource';
import { UserModel, UserModelType, UserDoc } from '../domain/userModel';
import { hash, genSalt } from 'bcryptjs';

export class UserDataSource extends MongooseDataSource<UserModelType, UserDoc> {
  constructor() {
    super(UserModel);
  }

  // save(user: UserDoc): mongoose.Query<UserDoc> {
  //   const { id, ...userToUpdate } = user;
  //   return this.model.findOneAndUpdate(user.id, userToUpdate);
  // }

  async registerUser(name: string, email: string, password: string): Promise<UserDoc> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    return user.save();
  }
}
