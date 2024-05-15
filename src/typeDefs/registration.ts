export default /* GraphQL */ `
  type Query {
    registrations: [Registration!]!
    registration(input: RegistrationIdsInput!): Registration!
    checkRegistration(eventId: String!): Boolean!
  }

  type Mutation {
    registerEvent(eventId: String!): Registration!
    unregisterEvent(eventId: String!): Registration!
  }

  type Registration {
    eventId: String!
    userId: String!
    event: Event
    user: User
  }

  input RegistrationIdsInput {
    eventId: String!
    userId: String!
  }
`;
