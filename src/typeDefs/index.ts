import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

console.log(import.meta.dirname);

const typesArray = loadFilesSync(import.meta.dirname, {
  ignoreIndex: true,
  extensions: ['ts'],
});

export const typeDefs = mergeTypeDefs(typesArray);
