import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adminRepository = {
  read: {
    admins: () => prisma.admin.findMany(),

    adminById: (id) => prisma.admin.findUnique({ where: { id } }),

    adminByEmail: (email) => prisma.admin.findUnique({ where: { email } }),
  },

  write: {
    admin: (data) => prisma.admin.create({ data }),
  },

  update: {
    adminById: (id, data) => prisma.admin.update({ where: { id }, data }),
  },

  remove: {
    adminById: (id) => prisma.admin.delete({ where: { id } }),
  },
};
