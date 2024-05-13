export default /* GraphQL */ `
  type Query {
    profile: User!
    publicProfile(username: String!): User
    allUsers: [User!]!
  }

  type Mutation {
    createUser: CreateUserResponse!
    updateUser(input: UpdateUserInput): User!
  }

  type User {
    id: ID!
    email: String
    username: String
    image: Image
    about: String
    createdAt: DateTime!
    updatedAt: DateTime!
    # createdEvents: [Event!]!
  }

  input UpdateUserInput {
    username: String!
    name: String!
    images: [ImageInput]
    about: String
  }

  type CreateUserResponse {
    id: ID!
    email: String!
    username: String!
  }
`;
