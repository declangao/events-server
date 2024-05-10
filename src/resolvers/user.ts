import { QueryResolvers, Resolvers } from '@/generated/graphql.js';
import { prisma } from '@/utils/db.js';

const allUsers: QueryResolvers['allUsers'] = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const resolvers: Resolvers = {
  Query: {
    allUsers,
  },
};

export default resolvers;
