import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const categoryServices = {
  createCategory: (input) => write.category(input),

  getCategoryList: () => read.categories(),

  getCategoryById: (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");
    return read.categoryById(id);
  },

  getCategoryBySlug: (input) => read.categoryBySlug(input),

  updateCategoryById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingCategory = await get.categoryById(id);
    if (!existingCategory) throw createError(404, "Category does not exist.");

    return update.categoryById(id, input);
  },

  removeCategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingCategory = await read.categoryById(id);
    if (!existingCategory) throw createError(404, "Category does not exist.");

    return remove.categoryById(id);
  },
};
