import { gql } from "graphql-tag";

export const categoryTypeDefs = gql`
  input CreateCategoryInput {
    name: String!
    description: String!
    shortDescription: String!
    slug: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadcrumb: String!
    posterImageUrl: String!
    lastEditedBy: String!
    seoSchema: String!
    status: ContentStatus!
  }

  input UpdateCategoryByIdInput {
    name: String
    description: String
    shortDescription: String
    slug: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadcrumb: String
    posterImageUrl: String
    lastEditedBy: String
    seoSchema: String
    status: ContentStatus
  }

  input GetCategoryBySlugInput {
    slug: String!
  }

  type Query {
    getCategoryList: [Category!]!
    getCategoryById(id: ID!): Category
    getCategoryBySlug(input: GetCategoryBySlugInput!): Category
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category
    updateCategoryById(id: ID!, input: UpdateCategoryByIdInput!): Category
    removeCategoryById(id: ID!): Category
  }
`;
