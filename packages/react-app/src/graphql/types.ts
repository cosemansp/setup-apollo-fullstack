/* eslint:disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /**
   * The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   **/
  Long: any;
};

export type AggregateAsset = {
  __typename?: 'AggregateAsset';
  count: Scalars['Int'];
};

export type Asset = Node & {
  __typename?: 'Asset';
  status: Status;
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  handle: Scalars['String'];
  fileName: Scalars['String'];
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  mimeType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String'];
};

export type AssetUrlArgs = {
  transformation?: Maybe<AssetTransformationInput>;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Array<Maybe<AssetEdge>>;
  aggregate: AggregateAsset;
};

export type AssetCreateInput = {
  status?: Maybe<Status>;
  handle: Scalars['String'];
  fileName: Scalars['String'];
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  mimeType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** The item at the end of the edge. */
  node: Asset;
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
};

export enum AssetOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  YearAsc = 'year_ASC',
  YearDesc = 'year_DESC',
  AltTextAsc = 'altText_ASC',
  AltTextDesc = 'altText_DESC',
  DimensionAsc = 'dimension_ASC',
  DimensionDesc = 'dimension_DESC',
}

export type AssetPreviousValues = {
  __typename?: 'AssetPreviousValues';
  status: Status;
  updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  handle: Scalars['String'];
  fileName: Scalars['String'];
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  mimeType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
};

export type AssetSubscriptionPayload = {
  __typename?: 'AssetSubscriptionPayload';
  mutation: MutationType;
  node?: Maybe<Asset>;
  updatedFields?: Maybe<Array<Scalars['String']>>;
  previousValues?: Maybe<AssetPreviousValues>;
};

export type AssetSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  mutation_in?: Maybe<Array<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  updatedFields_contains?: Maybe<Scalars['String']>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>;
  node?: Maybe<AssetWhereInput>;
};

/** Transformations for Assets */
export type AssetTransformationInput = {
  image?: Maybe<ImageTransformationInput>;
  document?: Maybe<DocumentTransformationInput>;
  /** Pass `true` if you want to validate the passed transformation parameters */
  validateOptions?: Maybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  status?: Maybe<Status>;
  handle?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  mimeType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
};

export type AssetUpdateManyMutationInput = {
  status?: Maybe<Status>;
  handle?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  mimeType?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
};

export type AssetUploadInput = {
  url: Scalars['String'];
  status?: Maybe<Status>;
  title?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
};

export type AssetWhereInput = {
  _search?: Maybe<Scalars['String']>;
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<AssetWhereInput>>;
  status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  status_in?: Maybe<Array<Status>>;
  /** All values that are not contained in given list. */
  status_not_in?: Maybe<Array<Status>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>;
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  /** All values less than the given value. */
  id_lt?: Maybe<Scalars['ID']>;
  /** All values less than or equal the given value. */
  id_lte?: Maybe<Scalars['ID']>;
  /** All values greater than the given value. */
  id_gt?: Maybe<Scalars['ID']>;
  /** All values greater than or equal the given value. */
  id_gte?: Maybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>;
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>;
  /** All values not ending with the given string. */
  id_not_ends_with?: Maybe<Scalars['ID']>;
  handle?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  handle_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  handle_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  handle_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  handle_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  handle_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  handle_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  handle_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  handle_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  handle_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  handle_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  handle_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  handle_not_ends_with?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  fileName_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  fileName_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  fileName_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  fileName_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  fileName_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  fileName_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  fileName_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  fileName_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  fileName_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  fileName_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  fileName_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  fileName_not_ends_with?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  height_not?: Maybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  height_in?: Maybe<Array<Scalars['Float']>>;
  /** All values that are not contained in given list. */
  height_not_in?: Maybe<Array<Scalars['Float']>>;
  /** All values less than the given value. */
  height_lt?: Maybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  height_lte?: Maybe<Scalars['Float']>;
  /** All values greater than the given value. */
  height_gt?: Maybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  height_gte?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  width_not?: Maybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  width_in?: Maybe<Array<Scalars['Float']>>;
  /** All values that are not contained in given list. */
  width_not_in?: Maybe<Array<Scalars['Float']>>;
  /** All values less than the given value. */
  width_lt?: Maybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  width_lte?: Maybe<Scalars['Float']>;
  /** All values greater than the given value. */
  width_gt?: Maybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  width_gte?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  /** All values that are not equal to given value. */
  size_not?: Maybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  size_in?: Maybe<Array<Scalars['Float']>>;
  /** All values that are not contained in given list. */
  size_not_in?: Maybe<Array<Scalars['Float']>>;
  /** All values less than the given value. */
  size_lt?: Maybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  size_lte?: Maybe<Scalars['Float']>;
  /** All values greater than the given value. */
  size_gt?: Maybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  size_gte?: Maybe<Scalars['Float']>;
  mimeType?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  mimeType_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimeType_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  mimeType_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  mimeType_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  mimeType_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  mimeType_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  mimeType_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  mimeType_not_ends_with?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  title_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  title_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  title_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  title_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  title_not_ends_with?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  /** All values that are not equal to given value. */
  category_not?: Maybe<Category>;
  /** All values that are contained in given list. */
  category_in?: Maybe<Array<Category>>;
  /** All values that are not contained in given list. */
  category_not_in?: Maybe<Array<Category>>;
  description?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  description_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  description_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  description_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  description_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  description_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  description_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  description_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  description_not_ends_with?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  year_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  year_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  year_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  year_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  year_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  year_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  year_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  year_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  year_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  year_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  year_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  year_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  year_not_ends_with?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  altText_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  altText_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  altText_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  altText_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  altText_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  altText_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  altText_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  altText_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  altText_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  altText_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  altText_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  altText_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  altText_not_ends_with?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
  /** All values that are not equal to given value. */
  dimension_not?: Maybe<Scalars['String']>;
  /** All values that are contained in given list. */
  dimension_in?: Maybe<Array<Scalars['String']>>;
  /** All values that are not contained in given list. */
  dimension_not_in?: Maybe<Array<Scalars['String']>>;
  /** All values less than the given value. */
  dimension_lt?: Maybe<Scalars['String']>;
  /** All values less than or equal the given value. */
  dimension_lte?: Maybe<Scalars['String']>;
  /** All values greater than the given value. */
  dimension_gt?: Maybe<Scalars['String']>;
  /** All values greater than or equal the given value. */
  dimension_gte?: Maybe<Scalars['String']>;
  /** All values containing the given string. */
  dimension_contains?: Maybe<Scalars['String']>;
  /** All values not containing the given string. */
  dimension_not_contains?: Maybe<Scalars['String']>;
  /** All values starting with the given string. */
  dimension_starts_with?: Maybe<Scalars['String']>;
  /** All values not starting with the given string. */
  dimension_not_starts_with?: Maybe<Scalars['String']>;
  /** All values ending with the given string. */
  dimension_ends_with?: Maybe<Scalars['String']>;
  /** All values not ending with the given string. */
  dimension_not_ends_with?: Maybe<Scalars['String']>;
};

export type AssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>;
  handle?: Maybe<Scalars['String']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long'];
};

export enum Category {
  Painting = 'Painting',
  Drawing = 'Drawing',
}

export enum DocumentFileTypes {
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Png = 'png',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Docx = 'docx',
  Html = 'html',
  Pdf = 'pdf',
  Doc = 'doc',
  Xlsx = 'xlsx',
  Xls = 'xls',
  Pptx = 'pptx',
  Ppt = 'ppt',
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   **/
  format?: Maybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: Maybe<DocumentOutputInput>;
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /**
   * Resizes the image to fit the specified parameters exactly by removing any
   * parts of the image that don't fit within the boundaries.
   **/
  Crop = 'crop',
  /**
   * Resizes the image to fit the specified parameters exactly by scaling the image
   * to the desired size. The aspect ratio of the image is not respected and the
   * image can be distorted using this method.
   **/
  Scale = 'scale',
  /**
   * Resizes the image to fit within the parameters, but as opposed to 'fit:clip'
   * will not scale the image if the image is smaller than the output size.
   **/
  Max = 'max',
}

export type ImageResizeInput = {
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: Maybe<Scalars['Int']>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: Maybe<Scalars['Int']>;
  /** The default value for the fit parameter is fit:clip. */
  fit?: Maybe<ImageFit>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: Maybe<ImageResizeInput>;
};

export enum Locale {
  En = 'EN',
}

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: Asset;
  uploadAsset: Asset;
  updateAsset?: Maybe<Asset>;
  deleteAsset?: Maybe<Asset>;
  upsertAsset: Asset;
  updateManyAssets: BatchPayload;
  deleteManyAssets: BatchPayload;
};

export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};

export type MutationUploadAssetArgs = {
  data: AssetUploadInput;
};

export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};

export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type MutationUpsertAssetArgs = {
  where: AssetWhereUniqueInput;
  create: AssetCreateInput;
  update: AssetUpdateInput;
};

export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyMutationInput;
  where?: Maybe<AssetWhereInput>;
};

export type MutationDeleteManyAssetsArgs = {
  where?: Maybe<AssetWhereInput>;
};

export enum MutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED',
}

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  assets: Array<Maybe<Asset>>;
  asset?: Maybe<Asset>;
  assetsConnection: AssetConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
};

export type QueryAssetsArgs = {
  where?: Maybe<AssetWhereInput>;
  orderBy?: Maybe<AssetOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type QueryAssetsConnectionArgs = {
  where?: Maybe<AssetWhereInput>;
  orderBy?: Maybe<AssetOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export enum Status {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Archived = 'ARCHIVED',
}

export type PageInfoFragment = { __typename?: 'PageInfo' } & Pick<
  PageInfo,
  'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'
>;

export type GetArtworkQueryVariables = {
  where?: Maybe<AssetWhereInput>;
  orderBy?: Maybe<AssetOrderByInput>;
};

export type GetArtworkQuery = { __typename?: 'Query' } & {
  assets: Array<
    Maybe<
      { __typename?: 'Asset' } & Pick<
        Asset,
        | 'status'
        | 'id'
        | 'handle'
        | 'mimeType'
        | 'title'
        | 'category'
        | 'description'
        | 'year'
        | 'altText'
        | 'dimension'
        | 'url'
      >
    >
  >;
};

export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;
export const GetArtworkDocument = gql`
  query getArtwork($where: AssetWhereInput, $orderBy: AssetOrderByInput) {
    assets(first: 50, where: $where, orderBy: $orderBy) {
      status
      id
      handle
      mimeType
      title
      category
      description
      year
      altText
      dimension
      url
    }
  }
`;

/**
 * __useGetArtworkQuery__
 *
 * To run a query within a React component, call `useGetArtworkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtworkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtworkQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetArtworkQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetArtworkQuery, GetArtworkQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetArtworkQuery, GetArtworkQueryVariables>(GetArtworkDocument, baseOptions);
}
export function useGetArtworkLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArtworkQuery, GetArtworkQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetArtworkQuery, GetArtworkQueryVariables>(GetArtworkDocument, baseOptions);
}
export type GetArtworkQueryHookResult = ReturnType<typeof useGetArtworkQuery>;
export type GetArtworkLazyQueryHookResult = ReturnType<typeof useGetArtworkLazyQuery>;
export type GetArtworkQueryResult = ApolloReactCommon.QueryResult<GetArtworkQuery, GetArtworkQueryVariables>;
