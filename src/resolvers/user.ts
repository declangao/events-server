import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '@/generated/graphql.js';
import { authCheck } from '@/middlewares/auth.js';
import { prisma } from '@/utils/db.js';
import { nanoid } from 'nanoid';

const allUsers: QueryResolvers['allUsers'] = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const createUser: MutationResolvers['createUser'] = async (
  _parent,
  _args,
  { req }
) => {
  const token = await authCheck(req);

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (user) {
    return user;
  }

  const newUser = await prisma.user.create({
    data: {
      email: token.email!,
      username: nanoid(10),
    },
  });
  return newUser;
};

const resolvers: Resolvers = {
  Query: {
    allUsers,
  },
  Mutation: {
    createUser,
  },
};

export default resolvers;
