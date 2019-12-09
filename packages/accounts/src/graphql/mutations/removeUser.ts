import { RemoveUserMutation } from '../graphqlTypes';
import { UserModel } from '@/domain/userModel';

/**
 mutation {
   removeUser(id: "5dee276e66b31e0f91aceb37") {
     user {
       id
       name
     }
    }
  }
 */
export const removeUser: RemoveUserMutation = async (root, { id }, { dataSources, res }) => {
  const removedUser = await UserModel.findByIdAndRemove(id);
  return {
    user: removedUser,
  };
};
