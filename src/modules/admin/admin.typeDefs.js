import { gql } from "graphql-tag";

export const adminTypeDefs = gql`
  input CreateAdminInput {
    name: String!
    email: String!
    password: String!
    role: Role!
    permissions: [String!]!
    lastEditedBy: String!
  }

  input UpdateAdminByIdInput {
    name: String
    email: String
    role: Role
    permissions: [String!]
    lastEditedBy: String
  }

  type Query {
    getAdminList: [Admin!]!
    getAdminById(id: ID!): Admin!
  }

  type Mutation {
    createAdmin(input: CreateAdminInput!): Admin!
    updateAdminById(id: ID!, input: UpdateAdminByIdInput!): Admin!
    removeAdminById(id: ID!): GenericResponse!
  }
`;
