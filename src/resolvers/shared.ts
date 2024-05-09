import { DateTimeResolver } from 'graphql-scalars';

export const sharedResolvers = {
  DateTime: DateTimeResolver,

  Query: {
    test: () => 'Hello World!',
  },
};
