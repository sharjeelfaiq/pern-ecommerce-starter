import { commonUtils } from "#utils/index.js";
import { emailServices } from "./email.services.js";

const { handleAsync } = commonUtils;

export const emailResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    checkVerificationToken: handleAsync(async (_parent, { input }) =>
      emailServices.checkVerificationToken(input),
    ),

    sendVerificationToken: handleAsync(async (_parent, { input }) =>
      emailServices.sendVerificationToken(input),
    ),
  },
};
