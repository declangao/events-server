import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '@/generated/graphql.js';
import { authCheck } from '@/middlewares/auth.js';
import { prisma } from '@/utils/db.js';

const allEvents: QueryResolvers['allEvents'] = async () => {
  const events = await prisma.event.findMany();

  return events;
};

const eventById: QueryResolvers['eventById'] = async (_parent, { id }) => {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return event;
};

const createEvent: MutationResolvers['createEvent'] = async (
  _parent,
  { input },
  { req }
) => {
  const token = await authCheck(req);

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });

  if (!user) {
    throw new Error('Unauthorized');
  }

  const event = await prisma.event.create({
    data: {
      ...input,
      creatorId: user.id,
      // creator: {
      //   connect: {
      //     id: 'xxx',
      //   },
      // },
    },
  });

  return event;
};

const updateEvent: MutationResolvers['updateEvent'] = async (
  _parent,
  { input }
) => {
  const event = await prisma.event.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
    },
  });

  return event;
};

const deleteEvent: MutationResolvers['deleteEvent'] = async (
  _parent,
  { id }
) => {
  const event = await prisma.event.delete({
    where: {
      id,
    },
  });

  return event;
};

const resolvers: Resolvers = {
  Query: {
    allEvents,
    eventById,
  },
  Mutation: {
    createEvent,
    updateEvent,
    deleteEvent,
  },
  Event: {
    creator: async (event) => {
      const user = await prisma.user.findUnique({
        where: {
          id: event.creatorId,
        },
      });
      return user!;
    },
  },
};

export default resolvers;
