import { mergeResolvers } from '@graphql-tools/merge';
import { sharedResolvers } from './shared';

export type ResolverContext = {
  req?: Request;
  res?: Response;
};

export const resolvers = mergeResolvers([sharedResolvers]);
