import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productRepository = {
  read: {
    products: () =>
      prisma.product.findMany({
        include: {
          category: true,
          subcategory: true,
        },
      }),

    productById: (id) =>
      prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          subcategory: true,
        },
      }),

    productByUrls: (categorySlug, subcategorySlug, productSlug) =>
      prisma.product.findFirst({
        where: {
          slug: productSlug,
          subcategory: {
            slug: subcategorySlug,
            category: {
              slug: categorySlug,
            },
          },
        },
        include: {
          category: true,
          subcategory: true,
        },
      }),
  },

  write: {
    product: (data) =>
      prisma.product.create({
        data,
      }),
  },

  update: {
    productById: (id, data) =>
      prisma.product.update({
        where: { id },
        data,
      }),
  },

  remove: {
    productById: (id) =>
      prisma.product.delete({
        where: { id },
      }),
  },
};
