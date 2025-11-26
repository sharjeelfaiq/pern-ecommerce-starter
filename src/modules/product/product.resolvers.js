import { productServices } from "./product.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const productResolvers = {
  Query: {
    getProductList: handleAsync(async () => productServices.getProductList()),

    getProductById: handleAsync(async (_parent, { id }) => productServices.getProductById(id)),

    getProductByUrls: handleAsync(async (_parent, { input }) =>
      productServices.getProductByUrls(input),
    ),
  },

  Mutation: {
    createProduct: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { input }) =>
          productServices.createProduct(input),
        ),
      ),
    ),

    updateProductById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { id, input }) =>
          productServices.updateProductById(id, input),
        ),
      ),
    ),

    removeProductById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { id }) =>
          productServices.removeProductById(id),
        ),
      ),
    ),
  },
};
