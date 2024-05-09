import { DateTimeResolver } from 'graphql-scalars';
import { QueryResolvers, Resolvers } from '../generated/graphql.js';

const test: QueryResolvers['test'] = () => 'hello';

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    test,
  },
};

export default resolvers;
