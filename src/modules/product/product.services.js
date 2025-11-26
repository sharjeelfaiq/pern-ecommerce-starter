import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const productServices = {
  createProduct: async (input) => {
    return await write.product(input);
  },

  getProductList: async () => await read.products(),

  getProductById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid product id.");
    return await read.productById(id);
  },

  getProductByUrls: async (input) => {
    const { categorySlug, subcategorySlug, productSlug } = input;
    return await read.productByUrls(categorySlug, subcategorySlug, productSlug);
  },

  updateProductById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid product id.");
    return await update.productById(id, input);
  },

  removeProductById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid product id.");
    await remove.productById(id);
    return { message: "Product deleted successfully" };
  },
};
