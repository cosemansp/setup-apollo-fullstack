import mongoose from 'mongoose';
import { MongooseDataSource } from './mongooseDataSource';
import { UserModel, UserModelType, UserDoc } from '../domain/userModel';

export class UserDataSource extends MongooseDataSource<UserModelType, UserDoc> {
  constructor() {
    super(UserModel);
  }

  save(user: UserDoc): mongoose.Query<UserDoc> {
    const { id, ...userToUpdate } = user;
    return this.model.findOneAndUpdate(user.id, userToUpdate);
  }
}
