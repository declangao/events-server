import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ResolverContext } from '../resolvers/index.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateEventInput = {
  datetime: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserResponse = {
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Event = {
  attendees: Array<User>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  datetime: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<Image>;
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Image = {
  publicId?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type ImageInput = {
  publicId?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type Mutation = {
  createEvent?: Maybe<Event>;
  createUser: CreateUserResponse;
  deleteEvent?: Maybe<Event>;
  deregisterEvent?: Maybe<Event>;
  registerEvent?: Maybe<Event>;
  updateEvent?: Maybe<Event>;
  updateUser: User;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeregisterEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};

export type Query = {
  aasassd?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  allEvents?: Maybe<Array<Maybe<Event>>>;
  allUsers: Array<User>;
  eventById?: Maybe<Event>;
  profile: User;
  publicProfile?: Maybe<User>;
  registration: Registration;
  registrations: Array<Registration>;
  test: Scalars['String']['output'];
};


export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPublicProfileArgs = {
  username: Scalars['String']['input'];
};


export type QueryRegistrationArgs = {
  input?: InputMaybe<RegistrationIdsInput>;
};

export type Registration = {
  event: Event;
  user: User;
};

export type RegistrationIdsInput = {
  eventId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UpdateEventInput = {
  datetime: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
  images?: InputMaybe<Array<InputMaybe<ImageInput>>>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateUserInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  images: Array<ImageInput>;
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type User = {
  about?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdEvents: Array<Event>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Image>;
  updatedAt: Scalars['DateTime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateEventInput: CreateEventInput;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Event: ResolverTypeWrapper<Event>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  ImageInput: ImageInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Registration: ResolverTypeWrapper<Registration>;
  RegistrationIdsInput: RegistrationIdsInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateEventInput: UpdateEventInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateEventInput: CreateEventInput;
  CreateUserResponse: CreateUserResponse;
  DateTime: Scalars['DateTime']['output'];
  Event: Event;
  ID: Scalars['ID']['output'];
  Image: Image;
  ImageInput: ImageInput;
  Mutation: {};
  Query: {};
  Registration: Registration;
  RegistrationIdsInput: RegistrationIdsInput;
  String: Scalars['String']['output'];
  UpdateEventInput: UpdateEventInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type CreateUserResponseResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  attendees?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  datetime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  publicId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResponse'], ParentType, ContextType>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'id'>>;
  deregisterEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationDeregisterEventArgs, 'id'>>;
  registerEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationRegisterEventArgs, 'id'>>;
  updateEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationUpdateEventArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
};

export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  aasassd?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  allEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  eventById?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventByIdArgs, 'id'>>;
  profile?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  publicProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryPublicProfileArgs, 'username'>>;
  registration?: Resolver<ResolversTypes['Registration'], ParentType, ContextType, Partial<QueryRegistrationArgs>>;
  registrations?: Resolver<Array<ResolversTypes['Registration']>, ParentType, ContextType>;
  test?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RegistrationResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['Registration'] = ResolversParentTypes['Registration']> = {
  event?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdEvents?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Registration?: RegistrationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

