import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const categoryRepository = {
  read: {
    categories: () =>
      prisma.category.findMany({
        include: {
          subcategories: true,
          products: true,
        },
      }),

    categoryById: (id) =>
      prisma.category.findUnique({
        where: { id },
        include: {
          subcategories: true,
          products: true,
        },
      }),

    categoryBySlug: ({ slug }) =>
      prisma.category.findUnique({
        where: { slug },
        include: {
          subcategories: {
            include: {
              products: true,
            },
          },
        },
      }),
  },

  write: {
    category: (data) =>
      prisma.category.create({
        data,
      }),
  },

  update: {
    categoryById: (id, data) =>
      prisma.category.update({
        where: { id },
        data,
      }),
  },

  remove: {
    categoryById: (id) =>
      prisma.category.delete({
        where: { id },
      }),
  },
};
