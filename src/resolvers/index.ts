import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { Request, Response } from 'express';

export type ResolverContext = {
  req: Request;
  res: Response;
};

const resolversArray = loadFilesSync(import.meta.dirname, {
  ignoreIndex: true,
  extensions: ['ts'],
});

export const resolvers = mergeResolvers(resolversArray);
