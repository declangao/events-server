export default /* GraphQL */ `
  type Query {
    allEvents(input: EventsQueryInput): EventConnection
    eventById(id: String!): Event
    myRegisteredEvents(input: EventsQueryInput): EventConnection
    myCreatedEvents(input: EventsQueryInput): EventConnection
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event
    updateEvent(input: UpdateEventInput!): Event
    deleteEvent(id: String!): Event
  }

  type Event {
    id: ID!
    name: String!
    description: String!
    location: String!
    datetime: DateTime!
    images: [Image!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    creatorId: String!
    creator: User
    # attendees: [User!]!
  }

  input CreateEventInput {
    name: String!
    description: String!
    location: String!
    datetime: DateTime!
    images: [ImageInput]
  }

  input UpdateEventInput {
    id: String!
    name: String!
    description: String!
    location: String!
    datetime: DateTime!
    images: [ImageInput]
  }

  input EventsQueryInput {
    page: Int
    limit: Int
  }

  type EventConnection {
    events: [Event!]!
    total: Int!
  }
`;
