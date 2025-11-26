import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRepository = {
  read: {
    users: () =>
      prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          isEmailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

    userById: (id) =>
      prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          isEmailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

    userByEmail: (email) =>
      prisma.user.findUnique({
        where: { email },
      }),
  },

  write: {
    user: (data) =>
      prisma.user.create({
        data,
      }),
  },

  update: {
    userById: (id, data) =>
      prisma.user.update({
        where: { id },
        data,
      }),
  },

  remove: {
    userById: (id) =>
      prisma.user.delete({
        where: { id },
      }),
  },
};
