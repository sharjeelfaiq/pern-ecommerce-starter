import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const subcategoryServices = {
  createSubcategory: async (input) => {
    const subcategory = await write.subcategory(input);
    console.log("Subcategory created:", subcategory);
    return subcategory;
  },

  getSubcategoryList: async () => await read.subcategories(),

  getSubcategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");
    return await read.subcategoryById(id);
  },

  getSubcategoryByUrls: async (input) => {
    const { categorySlug, subcategorySlug } = input;
    return await read.subcategoryByUrls(categorySlug, subcategorySlug);
  },

  updateSubcategoryById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");
    return await update.subcategoryById(id, input);
  },

  removeSubcategoryById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid subcategory id.");
    await remove.subcategoryById(id);
    return { message: "Subcategory deleted successfully" };
  },
};
