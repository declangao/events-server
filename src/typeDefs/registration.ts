export const registrationTypes = `#graphql
  type Query {
    registrations: [Registration!]!
    registration(input: RegistrationIdsInput): Registration!
  }

  type Mutation {
    registerEvent(id: String!): Event
    deregisterEvent(id: String!): Event
  }

  type Registration {
    event: Event!
    user: User!
  }
  
  input RegistrationIdsInput {
    eventId: String!
    userId: String!
  }
`;
