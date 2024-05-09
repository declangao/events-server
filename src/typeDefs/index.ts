import { mergeTypeDefs } from '@graphql-tools/merge';
import { eventTypes } from './event';
import { registrationTypes } from './registration';
import { sharedTypes } from './shared';
import { userTypes } from './user';

export const typeDefs = mergeTypeDefs([
  sharedTypes,
  userTypes,
  eventTypes,
  registrationTypes,
]);
