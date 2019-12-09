import { UpdateUserMutation } from '../graphqlTypes';
import { UserModel } from '@/domain/userModel';

/**
 * updateUser(id: "5dee276e66b31e0f91aceb37", input: {
 *  email: "john.doe@gmail.com",
 *  name: "1234"
 * }) {
 *   user {
 *     name
 *   }
 * }
 */
export const updateUser: UpdateUserMutation = async (root, { id, input }, { dataSources, res }) => {
  const updateUser = await UserModel.findOneAndUpdate({ _id: id }, { ...input }, { new: true });
  return {
    user: updateUser,
  };
};
