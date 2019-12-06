/* eslint:disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  JSON: any;
  Date: any;
};

export type AddItemToBasketInput = {
  checkoutID: Scalars['ID'];
  item: BasketItemInput;
};

export type AddItemToBasketPayload = {
  __typename?: 'AddItemToBasketPayload';
  basket?: Maybe<Basket>;
};

export type AddOrUpdateProductPayload = {
  __typename?: 'AddOrUpdateProductPayload';
  product?: Maybe<Product>;
};

export type Basket = {
  __typename?: 'Basket';
  checkoutID?: Maybe<Scalars['ID']>;
  items?: Maybe<Array<Maybe<BasketItem>>>;
};

export type BasketItem = {
  __typename?: 'BasketItem';
  id?: Maybe<Scalars['ID']>;
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
};

export type BasketItemInput = {
  quantity: Scalars['Int'];
  productId: Scalars['Int'];
};

export type ClearBasketPayload = {
  __typename?: 'ClearBasketPayload';
  basket?: Maybe<Basket>;
};

export type DeleteProductPayload = {
  __typename?: 'DeleteProductPayload';
  product?: Maybe<Product>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Add product to basket
   * 1. If the product already exist in the basket the quantity is added
   * 2. Product not found: ERROR
   * 3. Product not in stock: ERROR
   **/
  addItemToBasket?: Maybe<AddItemToBasketPayload>;
  /** Remove the product from the basket */
  removeItemFromBasket?: Maybe<RemoveItemFromBasketPayload>;
  /** Empty the basket */
  clearBasket?: Maybe<ClearBasketPayload>;
  /** Create or save a product */
  addOrUpdateProduct?: Maybe<AddOrUpdateProductPayload>;
  /** Remove a product */
  deleteProduct?: Maybe<DeleteProductPayload>;
};

export type MutationAddItemToBasketArgs = {
  input: AddItemToBasketInput;
};

export type MutationRemoveItemFromBasketArgs = {
  input: RemoveItemFromBasketInput;
};

export type MutationClearBasketArgs = {
  checkoutID?: Maybe<Scalars['ID']>;
};

export type MutationAddOrUpdateProductArgs = {
  input: ProductInput;
};

export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Product = {
  __typename?: 'Product';
  id?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  stocked?: Maybe<Scalars['Boolean']>;
  basePrice?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  totalCount?: Maybe<Scalars['Int']>;
  product?: Maybe<Array<Maybe<Product>>>;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  node?: Maybe<Product>;
  cursor: Scalars['String'];
};

export type ProductInput = {
  id?: Maybe<Scalars['Int']>;
  sku: Scalars['String'];
  title: Scalars['String'];
  desc?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  stocked?: Maybe<Scalars['Boolean']>;
  basePrice?: Maybe<Scalars['Float']>;
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  basket?: Maybe<Basket>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
  productsConnection?: Maybe<ProductConnection>;
};

export type QueryBasketArgs = {
  checkoutID: Scalars['String'];
};

export type QueryProductArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type QueryProductsArgs = {
  orderBy?: Maybe<Scalars['String']>;
};

export type QueryProductsConnectionArgs = {
  orderBy?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

export type RemoveItemFromBasketInput = {
  checkoutID: Scalars['ID'];
  productId: Scalars['Int'];
};

export type RemoveItemFromBasketPayload = {
  __typename?: 'RemoveItemFromBasketPayload';
  basket?: Maybe<Basket>;
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
  String: ResolverTypeWrapper<Scalars['String']>;
  Basket: ResolverTypeWrapper<Basket>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  BasketItem: ResolverTypeWrapper<BasketItem>;
  Product: ResolverTypeWrapper<Product>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ProductConnection: ResolverTypeWrapper<ProductConnection>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  ProductEdge: ResolverTypeWrapper<ProductEdge>;
  Mutation: ResolverTypeWrapper<{}>;
  AddItemToBasketInput: AddItemToBasketInput;
  BasketItemInput: BasketItemInput;
  AddItemToBasketPayload: ResolverTypeWrapper<AddItemToBasketPayload>;
  RemoveItemFromBasketInput: RemoveItemFromBasketInput;
  RemoveItemFromBasketPayload: ResolverTypeWrapper<RemoveItemFromBasketPayload>;
  ClearBasketPayload: ResolverTypeWrapper<ClearBasketPayload>;
  ProductInput: ProductInput;
  AddOrUpdateProductPayload: ResolverTypeWrapper<AddOrUpdateProductPayload>;
  DeleteProductPayload: ResolverTypeWrapper<DeleteProductPayload>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Basket: Basket;
  ID: Scalars['ID'];
  BasketItem: BasketItem;
  Product: Product;
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  ProductConnection: ProductConnection;
  PageInfo: PageInfo;
  ProductEdge: ProductEdge;
  Mutation: {};
  AddItemToBasketInput: AddItemToBasketInput;
  BasketItemInput: BasketItemInput;
  AddItemToBasketPayload: AddItemToBasketPayload;
  RemoveItemFromBasketInput: RemoveItemFromBasketInput;
  RemoveItemFromBasketPayload: RemoveItemFromBasketPayload;
  ClearBasketPayload: ClearBasketPayload;
  ProductInput: ProductInput;
  AddOrUpdateProductPayload: AddOrUpdateProductPayload;
  DeleteProductPayload: DeleteProductPayload;
  JSON: Scalars['JSON'];
  Date: Scalars['Date'];
};

export type AddItemToBasketPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AddItemToBasketPayload'] = ResolversParentTypes['AddItemToBasketPayload']
> = {
  basket?: Resolver<Maybe<ResolversTypes['Basket']>, ParentType, ContextType>;
};

export type AddOrUpdateProductPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AddOrUpdateProductPayload'] = ResolversParentTypes['AddOrUpdateProductPayload']
> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
};

export type BasketResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Basket'] = ResolversParentTypes['Basket']
> = {
  checkoutID?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['BasketItem']>>>, ParentType, ContextType>;
};

export type BasketItemResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['BasketItem'] = ResolversParentTypes['BasketItem']
> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type ClearBasketPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ClearBasketPayload'] = ResolversParentTypes['ClearBasketPayload']
> = {
  basket?: Resolver<Maybe<ResolversTypes['Basket']>, ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteProductPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['DeleteProductPayload'] = ResolversParentTypes['DeleteProductPayload']
> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  addItemToBasket?: Resolver<
    Maybe<ResolversTypes['AddItemToBasketPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddItemToBasketArgs, 'input'>
  >;
  removeItemFromBasket?: Resolver<
    Maybe<ResolversTypes['RemoveItemFromBasketPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveItemFromBasketArgs, 'input'>
  >;
  clearBasket?: Resolver<
    Maybe<ResolversTypes['ClearBasketPayload']>,
    ParentType,
    ContextType,
    MutationClearBasketArgs
  >;
  addOrUpdateProduct?: Resolver<
    Maybe<ResolversTypes['AddOrUpdateProductPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddOrUpdateProductArgs, 'input'>
  >;
  deleteProduct?: Resolver<
    Maybe<ResolversTypes['DeleteProductPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteProductArgs, 'id'>
  >;
};

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']
> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  basePrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type ProductConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ProductConnection'] = ResolversParentTypes['ProductConnection']
> = {
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductEdge']>>>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  product?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
};

export type ProductEdgeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['ProductEdge'] = ResolversParentTypes['ProductEdge']
> = {
  node?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  basket?: Resolver<
    Maybe<ResolversTypes['Basket']>,
    ParentType,
    ContextType,
    RequireFields<QueryBasketArgs, 'checkoutID'>
  >;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, QueryProductArgs>;
  products?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Product']>>>,
    ParentType,
    ContextType,
    QueryProductsArgs
  >;
  productsConnection?: Resolver<
    Maybe<ResolversTypes['ProductConnection']>,
    ParentType,
    ContextType,
    QueryProductsConnectionArgs
  >;
};

export type RemoveItemFromBasketPayloadResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['RemoveItemFromBasketPayload'] = ResolversParentTypes['RemoveItemFromBasketPayload']
> = {
  basket?: Resolver<Maybe<ResolversTypes['Basket']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AddItemToBasketPayload?: AddItemToBasketPayloadResolvers<ContextType>;
  AddOrUpdateProductPayload?: AddOrUpdateProductPayloadResolvers<ContextType>;
  Basket?: BasketResolvers<ContextType>;
  BasketItem?: BasketItemResolvers<ContextType>;
  ClearBasketPayload?: ClearBasketPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteProductPayload?: DeleteProductPayloadResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductConnection?: ProductConnectionResolvers<ContextType>;
  ProductEdge?: ProductEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveItemFromBasketPayload?: RemoveItemFromBasketPayloadResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
