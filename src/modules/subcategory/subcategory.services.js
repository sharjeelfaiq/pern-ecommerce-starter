import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const subcategoryServices = {
  createSubcategory: (input) => write.subcategory(input),

  getSubcategoryList: () => read.subcategories(),

  getSubcategoryById: (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");
    return read.subcategoryById(id);
  },

  getSubcategoryBySlugs: (input) => {
    return read.subcategoryBySlugs(input);
  },

  updateSubcategoryById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");

    const existingSubcategory = await read.subcategoryById(id);
    if (!existingSubcategory) throw createError(404, "Subcategory does not exist.");

    return await update.subcategoryById(id, input);
  },

  removeSubcategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");

    const existingSubcategory = await read.subcategoryById(id);
    if (!existingSubcategory) throw createError(404, "Subcategory does not exist.");

    return remove.subcategoryById(id);
  },
};
