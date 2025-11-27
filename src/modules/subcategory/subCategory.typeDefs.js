import { gql } from "graphql-tag";

export const subcategoryTypeDefs = gql`
  input CreateSubcategoryInput {
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
    categoryId: ID!
  }

  input UpdateSubcategoryByIdInput {
    id: ID!
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
    categoryId: ID
  }

  input GetSubcategoryBySlugsInput {
    subcategorySlug: String!
    categorySlug: String!
  }

  type Query {
    getSubcategoryList: [Subcategory!]!
    getSubcategoryById(id: ID!): Subcategory
    getSubcategoryBySlugs(input: GetSubcategoryBySlugsInput!): Subcategory
  }

  type Mutation {
    createSubcategory(input: CreateSubcategoryInput!): Subcategory
    updateSubcategoryById(id: ID!, input: UpdateSubcategoryByIdInput!): Subcategory
    removeSubcategoryById(id: ID!): Subcategory
  }
`;
