import { gql } from "graphql-tag";

export const productTypeDefs = gql`
  input CreateProductInput {
    name: String!
    description: String!
    shortDescription: String!
    slug: String!
    metaTitle: String!
    metaDescription: String!
    canonicalTag: String!
    breadcrumb: String!
    posterImageUrl: String!
    productImages: [String!]!
    seoSchema: String!
    price: Float!
    discountPrice: Float!
    width: Float!
    height: Float!
    color: String!
    pattern: String!
    composition: String!
    stock: Int!
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String!
    status: ContentStatus!
    categoryId: ID!
    subcategoryId: ID!
  }

  input UpdateProductByIdInput {
    name: String
    description: String
    shortDescription: String
    slug: String
    metaTitle: String
    metaDescription: String
    canonicalTag: String
    breadcrumb: String
    posterImageUrl: String
    productImages: [String!]
    seoSchema: String
    price: Float
    discountPrice: Float
    stock: Int
    width: Float
    height: Float
    color: String
    pattern: String
    composition: String
    additionalInfo: String
    measuringGuide: String
    lastEditedBy: String
    status: ContentStatus
    categoryId: ID
    subcategoryId: ID
  }

  input GetProductByUrlsInput {
    categorySlug: String!
    subcategorySlug: String!
    productSlug: String!
  }

  type Query {
    getProductList: [Product!]!
    getProductById(id: ID!): Product!
    getProductByUrls(input: GetProductByUrlsInput!): Product!
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProductById(id: ID!, input: UpdateProductByIdInput!): Product!
    removeProductById(id: ID!): GenericResponse!
  }
`;
