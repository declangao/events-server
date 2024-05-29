import {
  Event,
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '@/generated/graphql.js';
import { authCheck } from '@/middlewares/auth.js';
import { prisma } from '@/utils/db.js';
import { v2 as cloudinary } from 'cloudinary';

const allEvents: QueryResolvers['allEvents'] = async (_parent, { input }) => {
  const page = input?.page || 1;
  const limit = input?.limit || 10;

  let events: Event[] = [];

  if (input?.lat && input?.lng) {
    // https://stackoverflow.com/questions/37827468/find-the-nearest-location-by-latitude-and-longitude-in-postgresql
    events = await prisma.$queryRaw`
      SELECT * FROM (
      SELECT  *, ( 3959 * acos( cos( radians(${
        input.lat
      }) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(${
      input.lng
    }) ) + sin( radians(${input.lat}) ) * sin( radians( lat ) ) ) ) AS distance 
      FROM "Event"
      ) al
      ORDER BY distance
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `;
  } else {
    events = await prisma.event.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  const total = await prisma.event.count();

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    events,
    total,
  };
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

  const total = await prisma.registration.count({
    where: {
      userId: user.id,
    },
  });

  const page = input?.page || 1;
  const limit = input?.limit || 10;

  const registrations = await prisma.registration.findMany({
    where: {
      userId: user.id,
    },
    include: {
      event: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const events = registrations.map((reg) => reg.event);

  return {
    events,
    total,
  };
};

const myCreatedEvents: QueryResolvers['myCreatedEvents'] = async (
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

  const total = await prisma.event.count({
    where: {
      creatorId: user.id,
    },
  });

  const page = input?.page || 1;
  const limit = input?.limit || 10;

  const events = await prisma.event.findMany({
    where: {
      creatorId: user.id,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    events,
    total,
  };
};

const searchEvents: QueryResolvers['searchEvents'] = async (
  _parent,
  { input }
) => {
  const total = await prisma.event.count({
    where: {
      name: {
        contains: input.query,
        mode: 'insensitive',
      },
    },
  });

  const page = input?.page || 1;
  const limit = input?.limit || 10;

  const events = await prisma.event.findMany({
    where: {
      name: {
        contains: input.query,
        mode: 'insensitive',
      },
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    events,
    total,
  };
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
    searchEvents,
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
    attendees: async (event) => {
      const registrations = await prisma.registration.findMany({
        where: {
          eventId: event.id,
        },
        include: {
          user: true,
        },
      });

      return registrations.map((registration) => registration.user);
    },
  },
};

export default resolvers;
