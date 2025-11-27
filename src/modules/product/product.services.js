import createError from "http-errors";
import { repository } from "#repository/index.js";
import { commonUtils } from "#utils/index.js";

const { write, read, update, remove } = repository;
const { validateUuid } = commonUtils;

export const productServices = {
  createProduct: (input) => write.product(input),

  getProductList: () => read.products(),

  getProductById: (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");
    return read.productById(id);
  },

  getProductBySlugs: (input) => read.productBySlugs(input),

  updateProductById: async (id, input) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingProduct = await read.productById(id);
    if (!existingProduct) throw createError(404, "Product does not exist.");

    return await update.productById(id, input);
  },

  removeProductById: async (id) => {
    if (!validateUuid(id)) throw createError(400, "Invalid Uuid.");

    const existingProduct = await read.productById(id);
    if (!existingProduct) throw createError(404, "Product does not exist.");

    return remove.productById(id);
  },
};
