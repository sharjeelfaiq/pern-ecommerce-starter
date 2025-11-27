import createError from "http-errors";

import { tokenUtils, sendEmail } from "#utils/index.js";
import { repository } from "#repository/index.js";

const { read, update } = repository;

export const emailServices = {
  checkVerificationToken: async (input) => {
    const { verificationToken } = input;
    if (!verificationToken || typeof verificationToken !== "string")
      throw createError(400, "Verification token is undefined or invalid.");

    const decodedToken = tokenUtils.verify(verificationToken);

    const { id } = decodedToken;
    if (!id) throw createError(400, "Token does not contain the user id");

    const isUserUpdated = await update.userById(id, { isEmailVerified: true });
    if (!isUserUpdated) throw createError(500, "Failed to update user email verification.");

    return { message: "Email verified successfully" };
  },

  sendVerificationToken: async (input) => {
    const { email } = input;

    const user = await read.userByEmail(email);
    if (!user) throw createError(404, "User does not exist.");

    const verificationToken = tokenUtils.generate({ id: user.id }, "verificationToken");
    if (!verificationToken) throw createError(500, "Failed to generate verification token.");

    const sentEmail = await sendEmail("verification-email", {
      email,
      subject: "Welcome - Verify your email",
      verificationToken,
    });
    if (!sentEmail) throw createError(500, "Failed to send verification email.");

    return { message: "Verification email sent successfully" };
  },
};
