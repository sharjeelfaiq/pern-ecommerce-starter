import { categoryServices } from "./category.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const categoryResolvers = {
  Query: {
    getCategoryList: handleAsync(async () => categoryServices.getCategoryList()),

    getCategoryById: handleAsync(async (_parent, { id }) => categoryServices.getCategoryById(id)),

    getCategoryBySlug: handleAsync(async (_parent, { input }) =>
      categoryServices.getCategoryBySlug(input),
    ),
  },

  Mutation: {
    createCategory: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { input }) =>
          categoryServices.createCategory(input),
        ),
      ),
    ),

    updateCategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { id, input }) =>
          categoryServices.updateCategoryById(id, input),
        ),
      ),
    ),

    removeCategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { id }) =>
          categoryServices.removeCategoryById(id),
        ),
      ),
    ),
  },
};
