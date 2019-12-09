/* eslint:disable */
import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type Authentication = {
  __typename?: 'Authentication';
  user: User;
  accessToken: Scalars['String'];
  expires: Scalars['Int'];
};

export type Error = {
  reason: Scalars['String'];
  code?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginPayload = Authentication | NotAuthorizedError;

export type Mutation = {
  __typename?: 'Mutation';
  /** Login user */
  login: LoginPayload;
  /** Register as a new user */
  register: RegisterPayload;
  /** Update a existing User (Admin) */
  updateUser: UserPayload;
  /** Remove a User (Admin) */
  removeUser: UserPayload;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};

export type NotAuthorizedError = Error & {
  __typename?: 'NotAuthorizedError';
  reason: Scalars['String'];
  code?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Registered = {
  __typename?: 'Registered';
  user: User;
  accessToken: Scalars['String'];
  expires: Scalars['Int'];
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterPayload = Registered | UserAlreadyExistError;

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
};

export type UserAlreadyExistError = Error & {
  __typename?: 'UserAlreadyExistError';
  reason: Scalars['String'];
  code?: Maybe<Scalars['String']>;
};

export type UserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  address?: Maybe<AddressInput>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  user?: Maybe<User>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Address: ResolverTypeWrapper<Address>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  LoginPayload: ResolversTypes['Authentication'] | ResolversTypes['NotAuthorizedError'];
  Authentication: ResolverTypeWrapper<Authentication>;
  NotAuthorizedError: ResolverTypeWrapper<NotAuthorizedError>;
  Error: ResolverTypeWrapper<Error>;
  RegisterInput: RegisterInput;
  RegisterPayload: ResolversTypes['Registered'] | ResolversTypes['UserAlreadyExistError'];
  Registered: ResolverTypeWrapper<Registered>;
  UserAlreadyExistError: ResolverTypeWrapper<UserAlreadyExistError>;
  UserInput: UserInput;
  AddressInput: AddressInput;
  UserPayload: ResolverTypeWrapper<UserPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Int: Scalars['Int'];
  Address: Address;
  Mutation: {};
  LoginInput: LoginInput;
  LoginPayload: ResolversParentTypes['Authentication'] | ResolversParentTypes['NotAuthorizedError'];
  Authentication: Authentication;
  NotAuthorizedError: NotAuthorizedError;
  Error: Error;
  RegisterInput: RegisterInput;
  RegisterPayload:
    | ResolversParentTypes['Registered']
    | ResolversParentTypes['UserAlreadyExistError'];
  Registered: Registered;
  UserAlreadyExistError: UserAlreadyExistError;
  UserInput: UserInput;
  AddressInput: AddressInput;
  UserPayload: UserPayload;
  Boolean: Scalars['Boolean'];
};

export type AddressResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']
> = {
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type AuthenticationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Authentication'] = ResolversParentTypes['Authentication']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']
> = {
  __resolveType: TypeResolveFn<
    'NotAuthorizedError' | 'UserAlreadyExistError',
    ParentType,
    ContextType
  >;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type LoginPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']
> = {
  __resolveType: TypeResolveFn<'Authentication' | 'NotAuthorizedError', ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  login?: Resolver<
    ResolversTypes['LoginPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'input'>
  >;
  register?: Resolver<
    ResolversTypes['RegisterPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'input'>
  >;
  updateUser?: Resolver<
    ResolversTypes['UserPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'id' | 'input'>
  >;
  removeUser?: Resolver<
    ResolversTypes['UserPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserArgs, 'id'>
  >;
};

export type NotAuthorizedErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['NotAuthorizedError'] = ResolversParentTypes['NotAuthorizedError']
> = {
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type RegisteredResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Registered'] = ResolversParentTypes['Registered']
> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type RegisterPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RegisterPayload'] = ResolversParentTypes['RegisterPayload']
> = {
  __resolveType: TypeResolveFn<'Registered' | 'UserAlreadyExistError', ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
};

export type UserAlreadyExistErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserAlreadyExistError'] = ResolversParentTypes['UserAlreadyExistError']
> = {
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type UserPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Address?: AddressResolvers<ContextType>;
  Authentication?: AuthenticationResolvers<ContextType>;
  Error?: ErrorResolvers;
  LoginPayload?: LoginPayloadResolvers;
  Mutation?: MutationResolvers<ContextType>;
  NotAuthorizedError?: NotAuthorizedErrorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Registered?: RegisteredResolvers<ContextType>;
  RegisterPayload?: RegisterPayloadResolvers;
  User?: UserResolvers<ContextType>;
  UserAlreadyExistError?: UserAlreadyExistErrorResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
