import { subcategoryServices } from "./subcategory.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess, verifyRole } = verifications;

export const subcategoryResolvers = {
  Query: {
    getSubcategoryList: handleAsync(async () => subcategoryServices.getSubcategoryList()),

    getSubcategoryById: handleAsync(async (_parent, { id }) =>
      subcategoryServices.getSubcategoryById(id),
    ),

    getSubcategoryBySlugs: handleAsync(async (_parent, { input }) =>
      subcategoryServices.getSubcategoryBySlugs(input),
    ),
  },

  Mutation: {
    createSubcategory: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { input }) =>
          subcategoryServices.createSubcategory(input),
        ),
      ),
    ),

    updateSubcategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { id, input }) =>
          subcategoryServices.updateSubcategoryById(id, input),
        ),
      ),
    ),

    removeSubcategoryById: handleAsync(
      verifyAccess(
        verifyRole(["ADMIN", "SUPER_ADMIN"])(async (_parent, { id }) =>
          subcategoryServices.removeSubcategoryById(id),
        ),
      ),
    ),
  },
};
