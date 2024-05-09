export const sharedTypes = `#graphql
  scalar DateTime

  type Query {
    test: String!
  }

  type Image {
    url: String!
    publicId: String
  }

  input ImageInput {
    url: String!
    publicId: String
  }
`;
