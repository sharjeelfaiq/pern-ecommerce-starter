import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const categoryServices = {
  createCategory: async (input) => {
    return await write.category(input);
  },

  getCategoryList: async () => await read.categories(),

  getCategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid category id.");
    return await read.categoryById(id);
  },

  getCategoryByUrl: async (input) => {
    const { slug } = input;
    return await read.categoryByUrl(slug);
  },

  updateCategoryById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid category id.");
    return await update.categoryById(id, input);
  },

  removeCategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid category id.");
    await remove.categoryById(id);
    return { message: "Category deleted successfully" };
  },
};
