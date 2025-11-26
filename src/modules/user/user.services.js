import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const userServices = {
  getUserList: async () => await read.users(),

  getUserById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid user id.");
    return await read.userById(id);
  },

  updateUserById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid user id.");
    return await update.userById(id, input);
  },

  removeUserById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid user id.");
    await remove.userById(id);
    return { message: "User deleted successfully" };
  },
};
