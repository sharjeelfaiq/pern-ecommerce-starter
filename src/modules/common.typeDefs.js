import { gql } from "graphql-tag";

export const commonTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum Role {
    USER
    ADMIN
    SUPER_ADMIN
  }

  enum ContentStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  type GenericResponse {
    message: String!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    permissions: [String!]!
    role: Role!
    lastEditedBy: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isEmailVerified: Boolean!
    isNewsletterSubscribed: Boolean!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: ID!
    name: String!
    description: String!
    shortDescription: String!
    slug: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadcrumb: String!
    posterImageUrl: String!
    seoSchema: String!
    lastEditedBy: String!
    status: ContentStatus!
    products: [Product!]!
    subcategories: [Subcategory!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Subcategory {
    id: ID!
    categoryId: ID!
    name: String!
    description: String!
    shortDescription: String!
    slug: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadcrumb: String!
    posterImageUrl: String!
    seoSchema: String!
    lastEditedBy: String!
    status: ContentStatus!
    category: Category
    products: [Product!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Product {
    id: ID!
    categoryId: ID!
    subcategoryId: ID!
    name: String!
    description: String
    shortDescription: String
    slug: String!
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadcrumb: String
    posterImageUrl: String!
    productImages: [String!]!
    seoSchema: String
    price: Float!
    discountPrice: Float
    stock: Int!
    width: Float
    height: Float
    weight: Float
    color: String
    pattern: String
    composition: String
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String
    category: Category!
    subcategory: Subcategory!
    status: ContentStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
