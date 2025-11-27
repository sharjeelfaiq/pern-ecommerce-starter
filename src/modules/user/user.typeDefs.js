import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  input UpdateUserByIdInput {
    firstName: String
    lastName: String
    email: String
    isNewsletterSubscribed: Boolean
  }

  type Query {
    getUserList: [User!]!
    getUserById(id: ID!): User
  }

  type Mutation {
    updateUserById(id: ID!, input: UpdateUserByIdInput!): User
    removeUserById(id: ID!): User
  }
`;
