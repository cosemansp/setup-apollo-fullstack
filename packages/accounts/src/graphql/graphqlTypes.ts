import { MutationResolvers } from './types';

export * from './types';

export type RegisterMutation = MutationResolvers['register'];
export type LoginMutation = MutationResolvers['login'];
export type UpdateUserMutation = MutationResolvers['updateUser'];
export type RemoveUserMutation = MutationResolvers['removeUser'];
