import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '@/generated/graphql.js';
import { authCheck } from '@/middlewares/auth.js';
import { prisma } from '@/utils/db.js';
import { v2 as cloudinary } from 'cloudinary';

const allEvents: QueryResolvers['allEvents'] = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

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

const myRegisteredEvents: QueryResolvers['myRegisteredEvents'] = async (
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
  if (!user) throw new Error('User not found');

  const registrations = await prisma.registration.findMany({
    where: {
      userId: user.id,
    },
    include: {
      event: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return registrations.map((reg) => reg.event);
};

const myCreatedEvents: QueryResolvers['myCreatedEvents'] = async (
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
  if (!user) throw new Error('User not found');

  const events = await prisma.event.findMany({
    where: {
      creatorId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return events;
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
  { input },
  { req }
) => {
  const token = await authCheck(req);

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });
  if (!user) throw new Error('User not found');

  const event = await prisma.event.findUnique({
    where: {
      id: input.id,
      creatorId: user.id,
    },
  });
  if (!event) throw new Error('Event not found');

  const updatedEvent = await prisma.event.update({
    where: {
      id: input.id,
    },
    data: {
      ...input,
    },
  });

  return updatedEvent;
};

const deleteEvent: MutationResolvers['deleteEvent'] = async (
  _parent,
  { id },
  { req }
) => {
  const token = await authCheck(req);

  const user = await prisma.user.findUnique({
    where: {
      email: token.email,
    },
  });
  if (!user) throw new Error('User not found');

  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });
  if (!event) {
    throw new Error('Event not found');
  }

  if (event.creatorId !== user.id) {
    throw new Error('Unauthorized');
  }

  const deletedEvent = await prisma.event.delete({
    where: {
      id,
    },
  });

  if (deletedEvent) {
    cloudinary.api.delete_resources(
      deletedEvent.images.map((image) => image.publicId)
    );
  }

  return deletedEvent;
};

const resolvers: Resolvers = {
  Query: {
    allEvents,
    eventById,
    myRegisteredEvents,
    myCreatedEvents,
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
