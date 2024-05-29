import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '@/generated/graphql.js';
import { authCheck } from '@/middlewares/auth.js';
import { prisma } from '@/utils/db.js';
import { Prisma } from '@prisma/client';
import { uid } from 'uid';

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
      username: uid(),
    },
  });
  return newUser;
};

const myProfile: QueryResolvers['myProfile'] = async (
  _parent,
  _args,
  { req }
) => {
  const token = await authCheck(req);

  const user = prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const publicProfile: QueryResolvers['publicProfile'] = async (
  _parent,
  { username }
) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updateUser: MutationResolvers['updateUser'] = async (
  _parent,
  { input },
  { req }
) => {
  const token = await authCheck(req);

  let user;
  try {
    user = await prisma.user.update({
      where: {
        email: token.email,
      },
      data: {
        username: input.username,
        about: input.about,
        image: input.image || Prisma.JsonNull,
      },
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('Username already exists');
    }
    throw new Error('Something went wrong. Please try again later.');
  }

  return user;
};

const resolvers: Resolvers = {
  Query: {
    allUsers,
    myProfile,
    publicProfile,
  },
  Mutation: {
    createUser,
    updateUser,
  },
  User: {
    createdEvents: (parent) => {
      return prisma.event.findMany({
        where: {
          creatorId: parent.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
  },
};

export default resolvers;
