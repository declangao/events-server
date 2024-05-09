export default /* GraphQL */ `
  type Query {
    allEvents: [Event]
    eventById(id: String!): Event
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
    creator: User!
    attendees: [User!]!
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
`;
