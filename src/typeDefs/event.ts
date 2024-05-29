export default /* GraphQL */ `
  type Query {
    allEvents(input: EventsQueryInput): EventConnection
    eventById(id: String!): Event
    myRegisteredEvents(input: EventsQueryInput): EventConnection
    myCreatedEvents(input: EventsQueryInput): EventConnection
    searchEvents(input: SearchEventsQueryInput!): EventConnection
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
    lat: Float!
    lng: Float!
    address: String!
    attendees: [User!]
  }

  input CreateEventInput {
    name: String!
    description: String!
    location: String!
    datetime: DateTime!
    images: [ImageInput]
    lat: Float!
    lng: Float!
    address: String!
  }

  input UpdateEventInput {
    id: String!
    name: String!
    description: String!
    location: String!
    datetime: DateTime!
    images: [ImageInput]
    lat: Float!
    lng: Float!
    address: String!
  }

  input EventsQueryInput {
    page: Int
    limit: Int
    lat: Float
    lng: Float
  }

  input SearchEventsQueryInput {
    query: String!
    page: Int
    limit: Int
  }

  type EventConnection {
    events: [Event!]!
    total: Int!
  }
`;
