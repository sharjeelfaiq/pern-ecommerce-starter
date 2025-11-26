import { userServices } from "./user.services.js";
import { verifications, commonUtils } from "#utils/index.js";

const { handleAsync } = commonUtils;
const { verifyAccess } = verifications;

export const userResolvers = {
  Query: {
    getUserList: handleAsync(async () => userServices.getUserList()),

    getUserById: handleAsync(async (_parent, { id }) => userServices.getUserById(id)),
  },

  Mutation: {
    updateUserById: handleAsync(
      verifyAccess(async (_parent, { id, input }) => userServices.updateUserById(id, input)),
    ),

    removeUserById: handleAsync(
      verifyAccess(async (_parent, { id }) => userServices.removeUserById(id)),
    ),
  },
};
