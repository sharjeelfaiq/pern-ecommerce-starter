import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const subcategoryRepository = {
  read: {
    subcategories: () =>
      prisma.subcategory.findMany({
        include: {
          category: true,
          products: true,
        },
      }),

    subcategoryById: (id) =>
      prisma.subcategory.findUnique({
        where: { id },
        include: {
          category: true,
          products: true,
        },
      }),

    subcategoryBySlugs: ({ categorySlug, subcategorySlug }) =>
      prisma.subcategory.findFirst({
        where: {
          slug: subcategorySlug,
          category: {
            slug: categorySlug,
          },
        },
        include: {
          category: true,
          products: true,
        },
      }),
  },

  write: {
    subcategory: (data) => prisma.subcategory.create({ data }),
  },

  update: {
    subcategoryById: (id, data) => prisma.subcategory.update({ where: { id }, data }),
  },

  remove: {
    subcategoryById: (id) => prisma.subcategory.delete({ where: { id } }),
  },
};
