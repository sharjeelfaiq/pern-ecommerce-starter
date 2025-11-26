import { env } from "#config/index.js";
import { commonUtils } from "#utils/index.js";
import { authServices } from "./auth.services.js";

const { handleAsync } = commonUtils;
const { NODE_ENV } = env;

export const authResolvers = {
  Query: {
    _empty: () => "This is a placeholder",
  },

  Mutation: {
    signup: handleAsync(async (_parent, { input }) => authServices.signup(input)),

    signin: handleAsync(async (_parent, { input }, { res }) => {
      const resBody = await authServices.signin(input);
      const { accessToken } = resBody;

      res.cookie("accessToken", accessToken, {
        httpOnly: true, // cannot be read by JS
        secure: NODE_ENV === "production", // only over HTTPS
        sameSite: "lax",
        maxAge: 10 * 60 * 60 * 1000, // 10 hours
      });

      return { ...resBody, accessToken: undefined };
    }),

    signout: handleAsync(async (_parent, _args, { res }) => {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "lax",
      });

      return { status: "success", message: "Logged out successfully" };
    }),

    requestPasswordReset: handleAsync(async (_parent, { input }) =>
      authServices.requestPasswordReset(input),
    ),

    updatePassword: handleAsync(async (_parent, { input }) => authServices.updatePassword(input)),
  },
};
