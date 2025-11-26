import createError from "http-errors";
import { repository } from "#repository/index.js";
import { bcryptUtils, commonUtils } from "#utils/index.js";

const { validateUuid } = commonUtils;
const { write, read, update, remove } = repository;

export const adminServices = {
  createAdmin: async (input) => {
    const { email, password, ...rest } = input;

    const existingAdmin = await read.adminByEmail(email);
    if (existingAdmin) throw createError(400, "Admin already exists.");

    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

    return await write.admin({ email, password: hashedPassword, ...rest });
  },

  getAdminList: async () => await read.admins(),

  getAdminById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
    return await read.adminById(id);
  },

  updateAdminById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
    return await update.adminById(id, input);
  },

  removeAdminById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid admin id.");
    await remove.adminById(id);
    return { message: "Admin deleted successfully" };
  },
};
