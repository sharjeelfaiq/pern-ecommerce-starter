import createError from "http-errors";
import { repository } from "#repository/index.js";
import { bcryptUtils } from "#utils/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const adminServices = {
  createAdmin: async (input) => {
    const { email, password, ...rest } = input;

    const existingAdmin = await read.adminByEmail(email);
    if (existingAdmin) throw createError(400, "Admin already exists.");

    const hashedPassword = await bcryptUtils.hash(password, { rounds: 12 });

    return write.admin({ email, password: hashedPassword, ...rest });
  },

  getAdminList: () => read.admins(),

  getAdminById: (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");
    return read.adminById(id);
  },

  updateAdminById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingAdmin = await read.adminById(id);
    if (!existingAdmin) throw createError(404, "Admin does not exist.");

    return update.adminById(id, input);
  },

  removeAdminById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingAdmin = await read.adminById(id);
    if (!existingAdmin) throw createError(404, "Admin does not exist.");

    return remove.adminById(id);
  },
};
