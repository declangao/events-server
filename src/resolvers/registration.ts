import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '@/generated/graphql.js';
import { authCheck } from '@/middlewares/auth.js';
import { prisma } from '@/utils/db.js';

const checkRegistration: QueryResolvers['checkRegistration'] = async (
  _parent,
  { eventId },
  { req }
) => {
  const token = await authCheck(req);

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });
  if (!user) throw new Error('User not found');

  const existingReg = await prisma.registration.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId: user.id,
      },
    },
  });

  return !!existingReg;
};

const registerEvent: MutationResolvers['registerEvent'] = async (
  _parent,
  { eventId },
  { req }
) => {
  const token = await authCheck(req);

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  if (!event) {
    throw new Error('Event not found');
  }

  const existingReg = await prisma.registration.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId: user.id,
      },
    },
  });
  if (existingReg) {
    throw new Error('You already registered for this event');
  }

  const registration = await prisma.registration.create({
    data: {
      eventId,
      userId: user.id,
    },
  });

  return registration;
};

const unregisterEvent: MutationResolvers['unregisterEvent'] = async (
  _parent,
  { eventId },
  { req }
) => {
  const token = await authCheck(req);

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  if (!event) {
    throw new Error('Event not found');
  }

  const existingReg = await prisma.registration.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId: user.id,
      },
    },
  });
  if (!existingReg) {
    throw new Error("You haven't registered to this event");
  }

  const registration = await prisma.registration.delete({
    where: {
      eventId_userId: {
        eventId,
        userId: user.id,
      },
    },
  });

  return registration;
};

const resolvers: Resolvers = {
  Query: {
    checkRegistration,
  },
  Mutation: {
    registerEvent,
    unregisterEvent,
  },
};

export default resolvers;
