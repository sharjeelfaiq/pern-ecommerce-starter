import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const userServices = {
  getUserList: () => read.users(),

  getUserById: (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");
    return read.userById(id);
  },

  updateUserById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingUser = await read.userById(id);
    if (!existingUser) throw createError(404, "User does not exist.");

    return update.userById(id, input);
  },

  removeUserById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingUser = await read.userById(id);
    if (!existingUser) throw createError(404, "User does not exist.");

    return remove.userById(id);
  },
};
