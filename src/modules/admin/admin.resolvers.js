import { adminServices } from "./admin.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess } = verifications;

export const adminResolvers = {
  Query: {
    getAdminList: handleAsync(verifyAccess(async () => adminServices.getAdminList())),

    getAdminById: handleAsync(
      verifyAccess(async (_parent, { id }) => adminServices.getAdminById(id)),
    ),
  },

  Mutation: {
    createAdmin: handleAsync(
      verifyAccess(async (_parent, { input }) => adminServices.createAdmin(input)),
    ),

    updateAdminById: handleAsync(
      verifyAccess(async (_parent, { id, input }) => adminServices.updateAdminById(id, input)),
    ),

    removeAdminById: handleAsync(
      verifyAccess(async (_parent, { id }) => adminServices.removeAdminById(id)),
    ),
  },
};
